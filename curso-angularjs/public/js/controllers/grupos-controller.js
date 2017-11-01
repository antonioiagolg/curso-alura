angular.module('alurapic').controller('GruposController', function($scope, $http) {

    $scope.grupos = [];
    $http.get('/v1/grupos')
        .then(function(response) {
            $scope.grupos = response.data;
            console.log(response);
        }, function(erro){
            console.log(erro);
        }, function(value) {
            console.log(value);
        });
});