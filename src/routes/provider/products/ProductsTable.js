const Model = require('./ProductsTableModel');

const NotFound = require('../../../errors/NotFound');

module.exports = {
    list(idProvider) {
        return Model.findAll({
            where: {
                provider_id: idProvider
            }
        })
    },

    create(data) {
        const product = Model.create(data);

        if(!product) {
            throw new NotFound();
        }

        return product;
    }
}