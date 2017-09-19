angular.module('alurapic').controller('FotosController', function($scope, $http) {
	
	$scope.fotos = []; 
	$scope.filtro = '';
	$scope.mensagem = '';

	$http.get('/v1/fotos')
	.success(function(retorno) {
		console.log(retorno);
		$scope.fotos = retorno; // não precisa fazer retorno.data
	})
	.error(function(erro) {
		console.log(erro);
	});

	$scope.remover = function(foto) {
		$http.delete('/v1/fotos/' + foto._id)
		.then(function() {
			$scope.mensagem = 'Foto ' + foto.titulo + ' removida com sucesso!';
			var indexFoto = $scope.fotos.indexOf(foto);
			$scope.fotos.splice(foto, 1);
		}, function(erro) {
			$scope.mensagem = 'Houve um problema ao remover a foto!';
		});
	}
});