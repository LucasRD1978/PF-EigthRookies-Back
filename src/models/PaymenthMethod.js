const {DataTypes} = require('sequelize');

module.exports = (sequelize) =>{

    sequelize.define('paymenthMethod', {
        
        method: {
            type: DataTypes.STRING,
            allowNull: false
        }
        
    })
}