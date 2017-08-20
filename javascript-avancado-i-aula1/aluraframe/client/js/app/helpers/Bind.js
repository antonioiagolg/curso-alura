class Bind {
    constructor(objeto, view, ...props) {
        let proxy = ProxyFactory.create(objeto, props, model => view.update(model));
        view.update(objeto);

        return proxy;
    }
}