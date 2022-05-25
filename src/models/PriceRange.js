const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('priceRange', {

        price_range_min:{
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        
        price_range_max:{
            type: DataTypes.DECIMAL,
            allowNull: false
        }
    })
}