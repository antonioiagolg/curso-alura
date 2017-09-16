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
}