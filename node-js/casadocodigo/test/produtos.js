var express = require('../config/express.js')();
var request = require('supertest')(express);

describe('#ProdutosController', function() {
    it("#Listagem dos produtos json", function(done) {
        request.get('/produtos')
        .set('Accept', 'application/json')
        .expect('content-type',/json/)
        .expect(200, done);
    });

    it("#Listagem dos produtos html", function(done) {
        request.get('/produtos')
        .set('Accept', 'text/html')
        .expect(200, done);
    });

    it("#Cadastro de produtos inválidos via json", function(done) {
        request.post('/produtos')
        .set('Accept', 'application/json')
        .send({titulo:"", descricao:""})
        .expect('content-type',/json/)
        .expect(400, done);
    });

    it("#Cadastro de produtos válidos via json", function(done) {
        request.post('/produtos')
        .set('Accept', 'application/json')
        .send({titulo:"Livro de teste", descricao:"Livro de teste de inserção", preco:20.60})
        .expect(302, done);
    });

    it("#Cadastro de produtos inválidos via html", function(done) {
        request.post('/produtos')
        .send({titulo:"", descricao:""})
        .expect(400, done);
    })

    it("#Cadastro de produtos válidos via html", function(done) {
        request.post('/produtos')
        .send({titulo:"Livro de teste", descricao:"Livro de teste de inserção", preco:20.60})
        .expect(302, done);
    })
});