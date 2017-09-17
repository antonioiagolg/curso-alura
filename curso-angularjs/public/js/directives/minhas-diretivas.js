angular.module('minhasDiretivas',[])
    .directive('meuPainel', () => {
        let ddo = {};

        ddo.estrict = "AE";
        ddo.transclude = true;
        ddo.templateUrl = 'js/directives/meu-painel.html'
        ddo.scope = {
            titulo: '@'
        };
        
        return ddo;
    });