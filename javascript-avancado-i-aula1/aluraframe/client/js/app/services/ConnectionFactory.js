'use strict';

System.register([], function (_export, _context) {
	"use strict";

	var _createClass, stores, dbName, version, connection, close, ConnectionFactory;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	return {
		setters: [],
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

			stores = ['negociacoes'];
			dbName = 'aluraframe';
			version = 4;
			connection = null;
			close = null;

			_export('ConnectionFactory', ConnectionFactory = function () {
				function ConnectionFactory() {
					_classCallCheck(this, ConnectionFactory);

					throw new Error('Não é possível criar instâncias de ConnectionFactory');
				}

				/**
     * Obtém um conexão à base de dados. Retorna uma promise com a conexão
     * @return {Promise} A promessa com a conexão
     * 
     */


				_createClass(ConnectionFactory, null, [{
					key: 'getConnection',
					value: function getConnection() {
						return new Promise(function (resolve, reject) {

							var openRequest = window.indexedDB.open(dbName, version);

							openRequest.onupgradeneeded = function (e) {
								ConnectionFactory._createStores(e.target.result);
							};

							openRequest.onsuccess = function (e) {
								if (!connection) {
									connection = e.target.result;
								}

								// Monkey patch para evitar que o programador feche a connection.
								// Monkey patch é a sobreescrita de um método, adicionando uma nova
								// função ao método existente.
								close = connection.close.bind(connection);
								connection.close = function () {
									throw new Error('Você não pode fechar diretamente a connection!');
								};

								resolve(connection);
							};

							openRequest.onerror = function (e) {
								console.log(e.target.error);
								reject(e.target.error.name);
							};
						});
					}
				}, {
					key: '_createStores',
					value: function _createStores(connection) {
						stores.forEach(function (store) {
							if (connection.objectStoreNames.contains(store)) {
								connection.deleteObjectStore(store);
							}

							connection.createObjectStore(store, { autoIncrement: true });
						});
					}
				}, {
					key: 'closeConnection',
					value: function closeConnection() {
						close();
						connection = null;
					}
				}]);

				return ConnectionFactory;
			}());

			_export('ConnectionFactory', ConnectionFactory);
		}
	};
});
//# sourceMappingURL=ConnectionFactory.js.map