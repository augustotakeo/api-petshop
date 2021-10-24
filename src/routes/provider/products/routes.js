const routes = require('express').Router({ mergeParams: true });
const ProductsTable = require('./ProductsTable');

const Product = require('./Product');

const Serializer = require('../../../Serializer').ProductSerializer;

routes.get("/products", async (req, res) => {
    const products = await ProductsTable.list(req.provider.id);

    const serializer = new Serializer(res.getHeader("Content-Type"));

    res.send(serializer.serialize(products));
})

routes.post("/products", async (req, res, next) => {
    try {
        const provider_id = req.provider.id;
        const productData = {...req.body, provider_id };
        const product = new Product(productData);
        await product.create();

        const timestamp = new Date(product.updatedAt).getTime();
        res.set("ETag", product.version);
        res.set("Last-Modified", timestamp);
        res.set("Location", `/providers/${provider_id}/products/${product.id}`)
        
        const serializer = new Serializer(res.getHeader("Content-Type"));
        res.status(201).send(serializer.serialize(product));
    } catch(error) {
        next(error)
    }
})

routes.get("/products/:id", async (req, res, next) => {
    try{
        const data = {
            id: req.params.id,
            provider_id: req.provider.id
        }

        const product = new Product(data);
        await product.load();

        const timestamp = new Date(product.updatedAt).getTime();
        res.set("ETag", product.version);
        res.set("Last-Modified", timestamp);

        const extraField = ["price", "inventory", "provider_id", "createdAt", "updatedAt"];
        const serializer = new Serializer(res.getHeader("Content-Type"), extraField);

        res.send(serializer.serialize(product))
    } catch(error) {
        next(error);
    }
})

routes.delete("/products/:id", async (req, res, next) => {
    try{
        const data = {
            id: req.params.id,
            provider_id: req.provider.id
        }

        const product = new Product(data);
        await product.remove();

        res.status(204).end();
    } catch(error) {
        next(error);
    }
})

routes.put("/products/:id", async (req, res, next) => {
    try{
        let data = req.body;
        data = { ...data, id: req.params.id, provider_id: req.provider.id };
        const product = new Product(data);
        await product.update();
        await product.load();

        const timestamp = new Date(product.updatedAt).getTime();
        res.set("ETag", product.version);
        res.set("Last-Modified", timestamp);
        res.status(204).end();
    } catch(error) {
        next(error);
    }
})

routes.post("/products/:id/subtract-inventory", async (req, res, next) => {

    try {

        const data = { id: req.params.id, provider_id: req.provider.id };
        const product = new Product(data);

        await product.decreaseInventory(req.body);
        await product.load();

        const timestamp = new Date(product.updatedAt).getTime();
        res.set("ETag", product.version);
        res.set("Last-Modified", timestamp);
        res.status(204).end();

    } catch(error) {
        next(error);
    }

})

routes.head("/products/:id", async (req, res, next) => {
    try{
        const data = {
            id: req.params.id,
            provider_id: req.provider.id
        }

        const product = new Product(data);
        await product.load();

        const timestamp = new Date(product.updatedAt).getTime();
        res.set("ETag", product.version);
        res.set("Last-Modified", timestamp);

        res.send()
    } catch(error) {
        next(error);
    }
})

module.exports = routes;