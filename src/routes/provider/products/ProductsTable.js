const Model = require('./ProductsTableModel');
const sequelize = require('../../../database');

const NotFound = require('../../../errors/NotFound');
const QuantityTooHigh = require("../../../errors/QuantityTooHigh");

module.exports = {
    list(idProvider) {
        return Model.findAll({
            where: {
                provider_id: idProvider
            },
            raw: true
        })
    },

    async create(data) {
        const product = await Model.create(data);

        if(!product) {
            throw new NotFound("product");
        }

        return product;
    },

    async searchById(idProduct, idProvider) {
        const product = await Model.findOne({
            where: {
                id: idProduct,
                provider_id: idProvider
            }
        });

        if(!product) {
            throw new NotFound("product");
        }

        return product;
    },

    remove(idProduct, idProvider) {
        return Model.destroy({
            where: {
                id: idProduct,
                provider_id: idProvider
            }
        })
    },

    update(id, provider_id, data) {
        return Model.update(
            data,
            {
                where:{
                    id,
                    provider_id
                }
            }
        )
    },

    decrease(id, provider_id, field, quantity) {
        return sequelize.transaction( async transaction => {
            const product = await Model.findOne({
                where: {
                    id,
                    provider_id
                }
            })

            if( product[field] < quantity ){
                throw new QuantityTooHigh();
            }

            product[field] -= quantity;
            
            await product.save();
            
            return product;
        })
    }
}