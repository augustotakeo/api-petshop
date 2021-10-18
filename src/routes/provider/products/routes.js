const routes = require('express').Router({ mergeParams: true });
const ProductsTable = require('./ProductsTable');

const Product = require('./Product');
const Provider = require('../Provider');

routes.get("/products", async (req, res) => {
    const products = await ProductsTable.list(req.provider.id);
    res.send(JSON.stringify(products));
})

routes.post("/products", async (req, res) => {
    const provider_id = req.provider.id;
    const productData = {...req.body, provider_id };
    const product = new Product(productData);
    
    await product.create();
    
    res.status(201).send(JSON.stringify(product));
})

module.exports = routes;