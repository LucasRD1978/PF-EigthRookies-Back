const {DataTypes} = require('sequelize');

module.exports = (sequelize) =>{

    sequelize.define('products', {

        name: {
             type: DataTypes.STRING,
             allowNull: false
         },

        description: {
            type: DataTypes.STRING,
            allowNull: false
        },

        image:{
            type: DataTypes.STRING,
            allowNull: true
        },

        image2:{
            type: DataTypes.STRING,
            allowNull: true
        },

        image3:{
            type: DataTypes.STRING,
            allowNull: true
        },

        image4:{
            type: DataTypes.STRING,
            allowNull: true
        },

        // category: {
        //     type: DataTypes.STRING
        // },

        price: {
            type: DataTypes.FLOAT
        },

        range_price: {
            type: DataTypes.INTEGER
        }

    })
}