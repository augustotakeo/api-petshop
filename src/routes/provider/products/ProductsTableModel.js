const Sequelize = require('sequelize');
const sequelize = require('../../../database');

const ProviderTableModel = require('../ProviderTableModel');

const columns = {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    inventory: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 0
    },
    provider_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: ProviderTableModel,
            key: 'id'
        }
    }
};

const options = {
    freezeTableName: true,
    tableName: "products",
    timestamps: true,
    version: true
}

module.exports = sequelize.define("products", columns, options);