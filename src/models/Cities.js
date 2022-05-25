const {DataTypes} = require('sequelize');

module.exports = (sequelize) =>{

    sequelize.define('cities', {

        cities: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}