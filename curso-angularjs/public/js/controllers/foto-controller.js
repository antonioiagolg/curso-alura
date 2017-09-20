angular.module('alurapic').controller('FotoController', function($scope, $http, $routeParams){

    $scope.foto = {};
    $scope.mensagem = '';
    var fotoId = $routeParams.fotoId;

    if(fotoId) {
        $http.get('/v1/fotos/' + fotoId)
        .then(function(response) {
            $scope.foto = response.data;
        }, function(erro){
            $scope.mensagem = 'Não foi possível obter a foto para edição.';
        });
    }

    $scope.submeter = function() {
        if($scope.formulario.$valid) {

            if(fotoId) {
                $http.put('/v1/fotos/' + fotoId, $scope.foto)
                .then(function(response) {
                    $scope.mensagem = 'Foto alterada com sucesso!';
                }, function(erro) {
                    $scope.mensagem = 'Ocorreu um erro ao alterar a foto!';
                });
            } else {
                $http.post('/v1/fotos', $scope.foto)
                .then(function() {
                    $scope.mensagem = 'Imagem incluida com sucesso!';
                    $scope.foto = {};
                    $scope.formulario.$setPristine();
                }, function(erro) {
                    $scope.mensagem = 'Houve um problema ao incluir a imagem!';
                    console.log(erro);
                });
            }
        }
    }
});