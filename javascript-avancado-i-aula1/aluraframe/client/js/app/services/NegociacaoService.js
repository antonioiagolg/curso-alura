class NegociacaoService {
    obterNegociacoesDaSemana(cb) {
        this._obterNegociacoes("negociacoes/semana", cb);
    }

    obterNegociacoesDaSemanaAnterior(cb) {
        this._obterNegociacoes("negociacoes/anterior", cb);
    }

    obterNegociacoesDaSemanaRetrasada(cb) {
        this._obterNegociacoes("negociacoes/retrasada", cb);
    }

    _obterNegociacoes(url, cb) {
        let xhr = new XMLHttpRequest();

        xhr.open("GET", url);
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4) {
                if(xhr.status == 200) {
                    cb(null, JSON.parse(xhr.responseText)
                            .map(objeto => new Negociacao(new Date(objeto.data),
                                                            objeto.quantidade,
                                                            objeto.valor)));
                } else {
                    cb("Não foi possível receber as negociações", null);
                }
            }
        }
        xhr.send();
    }
}