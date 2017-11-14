export class View {
    constructor(elemento) {
        this._elemento = elemento;
    }

    template(model) {
        throw new Error("Este método precisa ser implementado pelas classes filhas");
    }

    update(model) {
        this._elemento.innerHTML = this.template(model);
    }
}