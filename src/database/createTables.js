const ProviderTableModel = require('../routes/provider/ProviderTableModel');
const ProductsTableModel = require('../routes/provider/products/ProductsTableModel');

const models = [ProviderTableModel, ProductsTableModel];

async function createTables() {
    for( let i=0; i<models.length; i++ ) {
        await models[i].sync();
    }
}

createTables();
