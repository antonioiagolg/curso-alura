angular.module('alurapic').controller('FotoController', function($scope, $http){

    $scope.foto = {};
    $scope.mensagem = '';

    $scope.submeter = function() {
        if($scope.formulario.$valid) {
            $http.post('/v1/fotos', $scope.foto)
            .then(function() {
                $scope.mensagem = 'Imagem incluida com sucesso!';
                $scope.foto = {};
            }, function(erro) {
                $scope.mensagem = 'Houve um problema ao incluir a imagem!';
                console.log(erro);
            });
        }
    }
});