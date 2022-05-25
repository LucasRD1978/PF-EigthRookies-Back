const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('user', {
    
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
       first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        phone: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        postal_code:{
            type: DataTypes.INTEGER,
            allowNull: true
        },

        address:{
            type: DataTypes.STRING,
            allowNull: true
        },

        
    })
}