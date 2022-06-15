const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('user', {

       email: {
            type: DataTypes.STRING,
            primaryKey:true,
            
        },
        
       first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        last_name: {
            type: DataTypes.STRING,
            allowNull: true
        },

        image: {
            type: DataTypes.STRING,
            allowNull: true
        },

        phone: {
            type: DataTypes.STRING,
            allowNull: true
        },

        postal_code:{
            type: DataTypes.STRING,
            allowNull: true
        },

        address:{
            type: DataTypes.STRING,
            allowNull: true
        },

        functions:{
            type:DataTypes.STRING,
            defaultValue:'usuario'
        }

    })
}
