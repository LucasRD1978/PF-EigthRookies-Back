const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('shoppingCar', {

        payment_id: {
            type: DataTypes.INTEGER
        },
        status: {
            type: DataTypes.STRING
        },
        payment_type: {
            type: DataTypes.STRING
        }
    })
}
