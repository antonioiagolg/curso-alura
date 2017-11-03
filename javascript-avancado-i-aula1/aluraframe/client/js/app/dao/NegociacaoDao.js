/**
 * Classe responsável pela persistência de dados
 * de negociação.
 */
class NegociacaoDao {

	constructor(connection) {
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
	adiciona(negociacao) {
		return new Promise((resolve, reject) => {
			let addRequest = this._connection.transaction(this._store, 'readwrite')
				.objectStore(this._store)
				.add(negociacao);

			addRequest.onsuccess = e => {
				resolve();
			};

			addRequest.onerror = e => {
				console.log(e.target.error);
				reject('Não foi possível adicionar uma negociação!');
			};
		});
	}

	/**
	 * Retorna todas as negociações
	 * 
	 * @return {Promise} Uma promise contendo as negociações
	 * 
	 */
	listaTodos() {

		return new Promise((resolve, reject) => {
			let negociacoes = [];
			let cursor = this._connection.transaction(this._store, 'readwrite')
				.objectStore(this._store)
				.openCursor();

			cursor.onsuccess = e => {
				let atual = e.target.result;

				if(atual) {
					let dado = atual.value;
					negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));
					atual.continue();
				} else {
					resolve(negociacoes);
				}
			};

			cursor.onerror = e => {
				console.log(e.target.error);
				reject('Não foi possível listar as negociações')
			};
		});
	}

	/**
	 * Agaga todas as negociações
	 * @return {Promise} Uma promise informando o sucesso ou o fracasso da exclusão
	 * 
	 */
	apagaTodos() {
		return new Promise((resolve, reject) => {
			let clearRequest = this._connection.transaction(this._store, 'readwrite')
				.objectStore(this._store)
				.clear();

			clearRequest.onsuccess = e => {
				resolve('Negociações apagadas com sucesso.');
			};

			clearRequest.onerror = e => {
				console.log(e.target.error);
				reject('Não foi possível apagar as negociações');
			};
		});
	}
}