const {DataTypes} = require('sequelize');

module.exports = (sequelize) =>{

    sequelize.define('rol', {

        type: {
            type:DataTypes.STRING
        }
    })
}