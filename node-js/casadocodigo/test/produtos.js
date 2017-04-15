var express = require('../config/express.js')();
var request = require('supertest')(express);

describe('#ProdutosController', function() {
    it("#Listagem dos produtos", function(done) {
        request.get('/produtos')
        .set('Accept', 'application/json')
        .expect('content-type',/json/)
        .expect(200, done);
    });
});