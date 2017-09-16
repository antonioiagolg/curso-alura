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
    }

    adiciona(event) {

        event.preventDefault();
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = "Negociação adicionada com sucesso.";
        this._limpaFormulario();
    }

    importaNegociacoes() {

        this._negociacaoService.obterNegociacoes()
        .then((arrayNegociacoes) => {
            arrayNegociacoes
            .forEach(negociacao => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = "Negociações importadas com sucesso!";
            });
        })
        .catch((erro) => this._mensagem.texto = erro);
    }

    _criaNegociacao() {
        let data = DataHelper.textoParaData(this._inputData.value);
        return new Negociacao(data, this._inputQuantidade.value, this._inputValor.value);
    }

    apaga() {

        this._listaNegociacoes.esvazia();
        this._mensagem.texto = "Negociações apagadas com sucesso.";
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