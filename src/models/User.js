const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('user', {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
          },
    
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

        image: {
            type: DataTypes.STRING,
            allowNull: true
        },

        password: {
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

        // admin: {
        //     type: DataTypes.BOOLEAN,
        //     defaultValue: false,
        //     allowNull: false,
        // }
    })
}