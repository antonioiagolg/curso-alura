angular.module('alurapic').controller('FotoController', function($scope, recursoFoto, $routeParams){

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

            if(fotoId) {
                recursoFoto.update({fotoId: fotoId}, $scope.foto, function(response){
                    $scope.mensagem = 'Foto alterada com sucesso!';
                }, function(erro) {
                    $scope.mensagem = 'Ocorreu um erro ao alterar a foto!';
                });
            } else {
                recursoFoto.save($scope.foto, function() {
                    $scope.mensagem = 'Imagem incluida com sucesso!';
                    $scope.foto = {};
                    $scope.formulario.$setPristine();
                }, function() {
                    $scope.mensagem = 'Houve um problema ao incluir a imagem!';
                });
            }
        }
    }
});