const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('shoppingCar', {

        status: {
            type: DataTypes.STRING
        },
        payment_id: {
            type: DataTypes.INTEGER
        },
        payment_type: {
            type: DataTypes.STRING,
        },
        merchant_order_id: {
            type: DataTypes.STRING,
        }
    })
}
