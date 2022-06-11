const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('shoppingCar', {

        payment_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        status: {
            type: DataTypes.STRING
        },
        payment_type: {
            type: DataTypes.STRING
        }
    })
}
