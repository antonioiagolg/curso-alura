export class Negociacao {
    constructor(data, quantidade, valor) {
        this._data = new Date(data.getTime());
        this._quantidade = quantidade;
        this._valor = valor;

        Object.freeze(this);
    }

    get quantidade() {
        return this._quantidade;
    }

    get valor() {
        return this._valor;
    }

    get data() {
        return new Date(this._data.getTime());
    }

    get volume() { 
        return this._quantidade * this._valor;
    }

    /**
     * Verifica se a negociação é igual à passada por parâmetro
     * 
     * @param  {Negociacao}  outraNegociacao A negociação a ser comparada.
     * @return {Boolean}                 Se são iguais ou não
     * 
     */
    isEquals(outraNegociacao) {
        return JSON.stringify(this) == JSON.stringify(outraNegociacao);
    }
}