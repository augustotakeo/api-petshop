const Model = require('./ProviderTableModel');
const NotFound = require('../../errors/NotFound');

module.exports = {
    list() {
        return Model.findAll({ raw: true });
    },

    create(provider) {
        return Model.create(provider);
    },

    async searchById(id) {
        const provider = await Model.findOne({
            where: { id }
        });

        if( !provider ){
            throw new NotFound();
        }

        return provider;
    },

    update(id, data) {
        return Model.update(
            data,
            {
                where: { id: id }
            }
        )
    },

    delete(id) {
        return Model.destroy({
            where: { id }
        })
    }
}