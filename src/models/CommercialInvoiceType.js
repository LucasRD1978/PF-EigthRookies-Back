const {DataTypes} = require('sequelize');

module.exports = (sequelize) =>{

    sequelize.define('commercialInvoiceType', {

        type: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}