class NegociacaoService {

    constructor() {
        this._http = new HttpService();
    }

    obterNegociacoes() {
        return Promise.all([
            this.obterNegociacoesDaSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()
        ]).then((arrayNegociacoes) =>
            arrayNegociacoes
            .reduce((arrayDerivado, array) => {
                return arrayDerivado.concat(array);
            },[])
        ).catch(erro => {throw new Error(erro)});
    }

    obterNegociacoesDaSemana() {
        return this._obterNegociacoes("negociacoes/semana", "Não foi possível obter as negociações da semana.");
    }

    obterNegociacoesDaSemanaAnterior() {
        return this._obterNegociacoes("negociacoes/anterior", "Não foi possível obter as negociações da semana anterior.");
    }

    obterNegociacoesDaSemanaRetrasada() {
        return this._obterNegociacoes("negociacoes/retrasada", "Não foi possível obter as negociações da semana retrasada.");
    }

    _obterNegociacoes(url, mensagemErro) {

        return this._http
                .get(url)
                .then((response) => {
                    return response.map(objeto =>
                        new Negociacao(new Date(objeto.data),
                                        objeto.quantidade,
                                        objeto.valor));
                })
                .catch((erro) => {
                    console.log(erro);
                    throw new Error(mensagemErro);
                });
    }

    /**
     * Cadastra uma negociação
     * 
     * @param  {Negociacao} negociacao A negociação a ser cadastrada
     * @return {Promise}               Uma promise contendo as mensagem de sucesso e fracasso.
     * 
     */
    cadastrar(negociacao) {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.adiciona(negociacao))
            .then(() => "Negociação adicionada com sucesso.")
            .catch(erro => {
                console.log(erro);
                throw new Error("Não foi possível adicionar uma negociação");
            });
    }

    /**
     * Lista as negociações do IndexedDB
     * @return {Promise} A promise contendo as negociações
     * 
     */
    lista() {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .catch(erro => {
                console.log(erro);
                throw new Error("Não foi possível listar as negociações");
            });
    }

    /**
     * Apaga as negociações da base de dados
     * 
     * @return {Promise} Uma promise contendo o sucesso ou fracasso da exclusão
     * 
     */
    apaga() {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
            .then(mensagem => "Negociações apagadas com sucesso.")
            .catch(mensagem => {
                console.log(erro);
                throw new Error("Não foi possível apagar as negociações");
            });
    }


    /**
     * Importa as negociações do servidor
     * 
     * @param  {Array} listaAtual Array de negociações existentes
     * @return {Promise}          Uma promise contendo as negociações importadas.
     * 
     */
    importa(listaAtual) {
        return this.obterNegociacoes()
            .then(arrayNegociacoes => arrayNegociacoes.filter(negociacao =>
                !listaAtual.some(negociacaoExistente => negociacaoExistente.isEquals(negociacao))))
            .catch(erro => {
                console.log(erro);
                throw new Error("Não foi possível importar as negociações");
            });
    }
}