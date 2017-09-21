angular.module('minhasDiretivas',[])
    .directive('meuPainel', () => {
        let ddo = {};

        ddo.estrict = "AE";
        ddo.transclude = true;
        ddo.templateUrl = 'js/directives/meu-painel.html';
        ddo.scope = {
            titulo: '@'
        };
        
        return ddo;
    })
    .directive('minhaFoto', () => {
        let ddo = {};

        ddo.estrict = "AE";
        ddo.templateUrl = 'js/directives/minha-foto.html';
        ddo.scope = {
            url: '@',
            titulo: '@'
        };

        return ddo;
    })
    .directive('meuBotaoPerigo', () => {
        let ddo = {};

        ddo.estrict = "E";
        ddo.scope = {
            acao: '&',
            nome: '@'
        };
        ddo.template = `<button type="button" ng-click="acao()" class="btn btn-danger btn-block">{{nome}}</button>`;
        return ddo;
    })
    .directive('meuFocus', () => {
        let ddo = {};

        ddo.estrict = "A";

        ddo.link = function(scope, element) {
            scope.$on('fotoCadastrada', function(){
                element[0].focus();
            });
        }
        return ddo;
    })
    .directive('meusTitulos', () => {
        let ddo = {};

        ddo.estrict = "E";
        ddo.template = `<ul><li ng-repeat="titulo in titulos">{{titulo}}</li></ul>`;
        ddo.controller = function($scope, recursoFoto){
            recursoFoto.query(function(response){
                $scope.titulos = response.map(function(foto){
                    return foto.titulo;
                });
            });
        }
        return ddo;
    })
    .directive('minhasCategorias', () => {
        let ddo = {};
        ddo.estrict = "E";
        ddo.scope = {
            name: '@',
            grupo: '='
        };
        ddo.controller = function($scope, $http){
            $scope.grupos = [];
            $http.get('/v1/grupos')
                .then(function(response) {
                    $scope.grupos = response.data;
                }, function(){
        
                });
        };

        ddo.link = function(scope, element) {
            element[0].name = scope.name;
        };

        ddo.template = `<select class="form-control"
                            ng-model="grupo"
                            ng-options="grupo._id as (grupo.nome | uppercase) for grupo in grupos" required>
                            <option value="">Selecione uma categoria</option>
                        </select>`;
        return ddo;
    });