const routes = require('express').Router();
const Provider = require('./Provider');
const ProviderTable = require('./ProviderTable');

const ProviderSerializer = require('../../Serializer').ProviderSerializer;

const products = require("./products/routes");

routes.get("/providers", async (req, res) => {
    const results = await ProviderTable.list();
    const serializer = new ProviderSerializer(res.getHeader("Content-Type"));
    const x = serializer.serialize(results);
    res.status(200).send(x);
})

routes.post("/providers", async (req, res, next) => {
    try {
        const data = req.body;
        const provider = new Provider(data);
        await provider.create();
        const serializer = new ProviderSerializer(res.getHeader("Content-Type"));
        res.status(201).send(serializer.serialize(provider));
    } catch(error) {
        next(error);
    }
})

routes.get("/providers/:id", async (req, res, next) => {
    try {    
        const id = req.params.id;
        const provider = new Provider({ id });
        await provider.searchById(id);
        const serializer = new ProviderSerializer(res.getHeader("Content-Type"), ["email", "createdAt", "updatedAt"]);
        res.status(200).send(serializer.serialize(provider));
    }catch(error){
        next(error);
    }
})

routes.put("/providers/:id", async (req, res, next) => {
    try { 
        const id = req.params.id
        let data = req.body;
        data = {...data, id: id};
        const provider = new Provider(data);
        await provider.update();
        res.status(204).end();
    } catch(error) {
        next(error);
    }
})

routes.delete("/providers/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const providers = new Provider({ id });
        await providers.searchById(id);
        await providers.delete();
        res.status(204).end();
    } catch(error) {
        next(error);
    }
})

const verifyProvider = async (req, res, next) => {
    try {
        const id = req.params.id;
        const provider = new Provider({ id });
        await provider.searchById(id);
        req.provider = provider;
        next();
    } catch(error) {
        next(error);
    }
}

routes.use("/providers/:id", verifyProvider, products);

module.exports = routes;