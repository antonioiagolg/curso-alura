angular.module('meusServicos',['ngResource'])
.factory('recursoFoto', function($resource) {
    return $resource('/v1/fotos/:fotoId', null, {
        update: {
            method: 'PUT'
        }
    });
})
.factory('cadastroDeFoto', function(recursoFoto, $q) {
    var retorno = {};
    retorno.cadastrar = function(foto) {
        return new $q(function(resolve, reject) {
            if(foto._id) {
                recursoFoto.update({fotoId: foto._id}, foto, function(response) {
                    resolve({
                        mensagem: 'Foto ' +  foto.titulo + ' alterada com sucesso!',
                        inclusao: false
                    });
                }, function(erro) {
                    reject({
                        mensagem: 'Não foi possível alterar a foto ' + foto.titulo
                    })
                });
            } else {
                recursoFoto.save(foto, function(response) {
                    resolve({
                        mensagem: 'Foto ' + foto.titulo + ' cadastrada com sucesso!',
                        inclusao: true
                    });
                }, function(erro) {
                    reject({
                        mensagem: 'Não foi possível cadastrar a foto ' + foto.titulo
                    });
                });
            }
        });
    }

    return retorno;
});