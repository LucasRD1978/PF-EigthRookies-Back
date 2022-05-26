const {DataTypes} = require('sequelize');

module.exports = (sequelize) =>{

    sequelize.define('products', {

      /*   id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        }, */
        
        name: {
             type: DataTypes.STRING,
             allowNull: false
         },

        description: {
            type: DataTypes.STRING,

        },

        image:{
            type: DataTypes.STRING,
        },

        image2:{
            type: DataTypes.STRING,
        },

        image3:{
            type: DataTypes.STRING,
        },

        image4:{
            type: DataTypes.STRING,
        },


        categoria: {
            type: DataTypes.STRING
        },

        price: {
            type: DataTypes.FLOAT
        },

        range_price: {
            type: DataTypes.FLOAT
        }

    })
}
