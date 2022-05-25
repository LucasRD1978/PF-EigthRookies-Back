const {DataTypes} = require('sequelize');

module.exports = (sequelize) =>{
    
    sequelize.define('buy', {
        
        amount: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },

        commercial_invoice: {
            type: DataTypes.INTEGER,            
        }
    })
}