const {DataTypes} = require('sequelize');

module.exports = (sequelize) =>{

    sequelize.define('sales', {

        commercial_invoice: {
            type: DataTypes.INTEGER,

        }
    })
}