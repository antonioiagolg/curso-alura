
/**
 * Module pattern, isolando as variáveis do escopo global, colocando elas
 * no escopo da função anônima
 *
 * @return {ConnectionFactory} A classe ConnectionFactory
 * 
 */
var ConnectionFactory = (function() {
	/**
	 * Classe responsável por criar conexões para o IndexedDB
	 */
	const stores = ['negociacoes'];
	const dbName = 'aluraframe';
	const version = 4;
	var connection = null; // Receberá a conexão, assim teremos apenas uma conexão pela aplicação
	var close = null; // Método original da connection, para evitar que o desenvolvedor possa fechar a
					  // conexão pelo objeto connection

	return class ConnectionFactory {

		constructor() {
			throw new Error('Não é possível criar instâncias de ConnectionFactory');
		}

		/**
		 * Obtém um conexão à base de dados. Retorna uma promise com a conexão
		 * @return {Promise} A promessa com a conexão
		 * 
		 */
		static getConnection() {
			return new Promise((resolve, reject) => {

				let openRequest = window.indexedDB.open(dbName, version);

				openRequest.onupgradeneeded = e => {
					ConnectionFactory._createStores(e.target.result);
				}

				openRequest.onsuccess = e => {
					if(!connection) {
						connection = e.target.result;
					}

					// Monkey patch para evitar que o programador feche a connection.
					// Monkey patch é a sobreescrita de um método, adicionando uma nova
					// função ao método existente.
					close = connection.close.bind(connection);
					connection.close = function() {
						throw new Error('Você não pode fechar diretamente a connection!');
					}

					resolve(connection);
				}

				openRequest.onerror = e => {
					console.log(e.target.error);
					reject(e.target.error.name);
				}
			});
		}

		/**
		 * Cria stores dentro da base de dados
		 * 
		 * @param  {Object} A connection com o banco de dados
		 */
		static _createStores(connection) {
			stores.forEach(store => {
				if(connection.objectStoreNames.contains(store)) {
					connection.deleteObjectStore(store);
				}

				connection.createObjectStore(store, {autoIncrement: true});
			});
		}

		/**
		 * Fecha a conexão. O programador deve usar esta função.
		 * @return {[type]}
		 */
		static closeConnection() {
			close();
			connection = null;
		}
	}
})();