angular.module('alurapic').controller('FotoController', function($scope, recursoFoto, cadastroDeFoto, $routeParams){

    $scope.foto = {};
    $scope.mensagem = '';
    var fotoId = $routeParams.fotoId;

    if(fotoId) {
        recursoFoto.query({fotoId: fotoId}, function(response){
            $scope.foto = response[0];
        }, function(erro) {
            $scope.mensagem = 'Não foi possível obter a foto para edição.';
        });
    }

    $scope.submeter = function() {
        if($scope.formulario.$valid) {
            cadastroDeFoto.cadastrar($scope.foto)
            .then(function(response) {
                $scope.mensagem = response.mensagem;
                if(response.inclusao) {
                    $scope.foto = {};
                    $scope.formulario.$setPristine();
                }
            }, function(erro) {
                $scope.mensagem = mensagem;
            });
        }
    }
});