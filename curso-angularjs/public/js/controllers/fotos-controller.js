angular.module('alurapic').controller('FotosController', function($scope, recursoFoto) {
	
	$scope.fotos = []; 
	$scope.filtro = '';
	$scope.mensagem = '';

	recursoFoto.query(function(response) {
		$scope.fotos = response;
	}, function(erro) {
		console.log(erro);
	});

	$scope.remover = function(foto) {
		recursoFoto.delete({fotoId: foto._id},function(response) {
			$scope.mensagem = 'Foto ' + foto.titulo + ' removida com sucesso!';
			var indexFoto = $scope.fotos.indexOf(foto);
			$scope.fotos.splice(indexFoto, 1);
		}, function(erro) {
			$scope.mensagem = 'Houve um problema ao remover a foto!';
		});
	}
});