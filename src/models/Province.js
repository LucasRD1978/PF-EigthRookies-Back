const {DataTypes} = require('sequelize');

module.exports = (sequelize) =>{

    sequelize.define('province', {

        province: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}