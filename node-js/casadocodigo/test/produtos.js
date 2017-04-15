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
});