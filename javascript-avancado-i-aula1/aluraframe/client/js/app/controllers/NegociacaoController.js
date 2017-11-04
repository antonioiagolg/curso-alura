class NegociacaoController {
    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");
        this._ordemAtual = '';

        this._listaNegociacoes = new Bind(new ListaNegociacoes(),
                                            new NegociacoesView($("#tabela-negociacoes")),
                                            "adiciona",
                                            "esvazia",
                                            "ordena",
                                            "inverteOrdem");

        this._mensagem = new Bind(new Mensagem(),
                                    new MensagemView($("#mensagem-view")),
                                    "texto");

        this._negociacaoService = new NegociacaoService();

        this._init();
    }

    /**
     * Método que inicializa algumas funções de início.
     * 
     */
    _init() {
        this._negociacaoService.lista()
            .then(negociacoes => negociacoes.forEach(negociacao =>this._listaNegociacoes.adiciona(negociacao)))
            .catch(erro => this._mensagem.texto = erro);

        setInterval(() => {
            this.importaNegociacoes();
        }, 3000);
    }

    /**
     * Adiciona uma negociação na base de dados
     * 
     * @param  {Object} event O evento instanciado ao realizar a ação de clicar.
     *
     */
    adiciona(event) {

        event.preventDefault();
        let negociacao = this._criaNegociacao();

        this._negociacaoService.cadastrar(negociacao)
        .then(mensagem => {
            this._listaNegociacoes.adiciona(negociacao);
            this._mensagem.texto = mensagem;
            this._limpaFormulario();
        })
        .catch(erro => this._mensagem.texto = erro);

    }

    /**
     * Importa as negociações do servidor, sem repetir
     * as que já foram importadas.
     *  
     */
    importaNegociacoes() {

        this._negociacaoService
            .importa(this._listaNegociacoes.negociacoes)
            .then((arrayNegociacoes) => {
                arrayNegociacoes
                .forEach(negociacao => {
                    this._listaNegociacoes.adiciona(negociacao);
                    this._mensagem.texto = "Negociações importadas com sucesso!";
                });
            })
            .catch((erro) => this._mensagem.texto = erro);
    }

    /**
     * Cria uma negociação
     * 
     * @return {Negociacao} A negociação
     * 
     */
    _criaNegociacao() {
        let data = DataHelper.textoParaData(this._inputData.value);
        return new Negociacao(data,
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value));
    }

    /**
     * Apaga as negociações do banco
     * 
     */
    apaga() {

        this._negociacaoService.apaga()
            .then(mensagem => {
                this._mensagem.texto = mensagem;
                this._listaNegociacoes.esvazia();
            })
            .catch(mensagem => this._mensagem.texto = mensagem);
    }

    _limpaFormulario() {
        this._inputData.value = "";
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0;

        this._inputData.focus();
    }

    ordena(coluna) {
        if(this._ordemAtual == coluna) {
            this._listaNegociacoes.inverteOrdem();
        } else {
            this._listaNegociacoes.ordena((a,b) => a[coluna] - b[coluna]);    
        }
        
        this._ordemAtual = coluna;
    }
}