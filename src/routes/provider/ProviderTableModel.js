const Sequelize = require('sequelize');
const sequelize = require('../../database');

const conlumns = {
    company : {
        type : Sequelize.STRING,
        allowNull : false,
    },
    email : {
        type : Sequelize.STRING,
        allowNull : false,
    },
    category : {
        type : Sequelize.ENUM('ração', 'brinquedos'),
        allowNull : false,
    }
}

const options = {
    freezeTableName: true,
    tableName: "providers",
    timestamps: true,
    version: true
}

module.exports = sequelize.define("provider", conlumns, options);