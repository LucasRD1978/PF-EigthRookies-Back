const sequelize = require('sequelize');
const {DataTypes} = require('sequelize');

module.exports = (sequelize) =>{

    sequelize.define('review', {

        title: {
            type: DataTypes.STRING,
            allowNull: false
        },

        rate: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                isNumeric: true
            }
        },

        content: {
            type: DataTypes.TEXT,
            allowNull: false
        }
        
    })
}