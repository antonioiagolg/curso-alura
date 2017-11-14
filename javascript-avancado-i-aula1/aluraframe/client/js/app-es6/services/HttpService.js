export class HttpService {

    /**
     * Trata os erros da requisição
     * 
    */
    _handleErrors(res) {
        if(!res.ok) throw new Error(res.statusText);
        return res;
    }

    /**
     * Busca informações do servidor
     * @param {String} url A url do recurso
     * @returns {Promise} Uma promise contendo o resultado
     * 
    */
    get(url) {
        
        return fetch(url)
                .then(res => this._handleErrors(res))
                .then(res => res.json());
    }

    /**
     * Envia informações para o servidor.
     * 
     * @param {String} url A url do recurso
     * @param {Object} dado O dado a ser enviado
     * @returns {Promise} Uma promise contendo o sucesso ou fracasso da operação
     * @memberof HttpService
     */
    post(url, dado) {

        return fetch(url, {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(dado)
        })
        .then(res => this._handleErrors(res))
        .then(res => res.json());
    }
}