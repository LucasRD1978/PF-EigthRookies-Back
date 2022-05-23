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

        image1:{
            type: DataTypes.STRING,
            allowNull: false
        },

        image2:{
            type: DataTypes.STRING,
            allowNull: false
        },

        image3:{
            type: DataTypes.STRING,
            allowNull: false
        },

        image4:{
            type: DataTypes.STRING,
            allowNull: false
        },

        price: {
            type: DataTypes.FLOAT,
            defaultValue: 0
        },

        stock: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    })
}