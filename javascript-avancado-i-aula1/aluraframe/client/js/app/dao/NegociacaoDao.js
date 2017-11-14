'use strict';

System.register(['../models/Negociacao'], function (_export, _context) {
	"use strict";

	var Negociacao, _createClass, NegociacaoDao;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	return {
		setters: [function (_modelsNegociacao) {
			Negociacao = _modelsNegociacao.Negociacao;
		}],
		execute: function () {
			_createClass = function () {
				function defineProperties(target, props) {
					for (var i = 0; i < props.length; i++) {
						var descriptor = props[i];
						descriptor.enumerable = descriptor.enumerable || false;
						descriptor.configurable = true;
						if ("value" in descriptor) descriptor.writable = true;
						Object.defineProperty(target, descriptor.key, descriptor);
					}
				}

				return function (Constructor, protoProps, staticProps) {
					if (protoProps) defineProperties(Constructor.prototype, protoProps);
					if (staticProps) defineProperties(Constructor, staticProps);
					return Constructor;
				};
			}();

			_export('NegociacaoDao', NegociacaoDao = function () {
				function NegociacaoDao(connection) {
					_classCallCheck(this, NegociacaoDao);

					this._connection = connection; // A conexão com o banco de dados
					this._store = 'negociacoes'; // A object store de negociações
				}

				/**
     * Adiciona uma negociação na base de dados
     * 
     * @param  {Negociacao} negociacao O objeto negociacao
     * @return {Promise}               A promessa com o sucesso ou fracasso da adição
     * 
     */


				_createClass(NegociacaoDao, [{
					key: 'adiciona',
					value: function adiciona(negociacao) {
						var _this = this;

						return new Promise(function (resolve, reject) {
							var addRequest = _this._connection.transaction(_this._store, 'readwrite').objectStore(_this._store).add(negociacao);

							addRequest.onsuccess = function (e) {
								resolve();
							};

							addRequest.onerror = function (e) {
								console.log(e.target.error);
								reject('Não foi possível adicionar uma negociação!');
							};
						});
					}
				}, {
					key: 'listaTodos',
					value: function listaTodos() {
						var _this2 = this;

						return new Promise(function (resolve, reject) {
							var negociacoes = [];
							var cursor = _this2._connection.transaction(_this2._store, 'readwrite').objectStore(_this2._store).openCursor();

							cursor.onsuccess = function (e) {
								var atual = e.target.result;

								if (atual) {
									var dado = atual.value;
									negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));
									atual.continue();
								} else {
									resolve(negociacoes);
								}
							};

							cursor.onerror = function (e) {
								console.log(e.target.error);
								reject('Não foi possível listar as negociações');
							};
						});
					}
				}, {
					key: 'apagaTodos',
					value: function apagaTodos() {
						var _this3 = this;

						return new Promise(function (resolve, reject) {
							var clearRequest = _this3._connection.transaction(_this3._store, 'readwrite').objectStore(_this3._store).clear();

							clearRequest.onsuccess = function (e) {
								resolve('Negociações apagadas com sucesso.');
							};

							clearRequest.onerror = function (e) {
								console.log(e.target.error);
								reject('Não foi possível apagar as negociações');
							};
						});
					}
				}]);

				return NegociacaoDao;
			}());

			_export('NegociacaoDao', NegociacaoDao);
		}
	};
});
//# sourceMappingURL=NegociacaoDao.js.map