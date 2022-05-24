const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('shoppingCar', {

        amount: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
    })
}