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
        fullPrice: {
            type: DataTypes.FLOAT,
        }
    })
}
