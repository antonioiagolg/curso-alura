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
    });