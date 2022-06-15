const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('order', {
    status: {
      type: DataTypes.ENUM(
        'inWishList',
        'inCart',
        'pending',
        'finished',
        'cancelled',
        'delivery',
        'delivered',
      ),
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
    purchaseId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    serverPurchaseDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    localPurchaseDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    serverDeliverDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    localDeliverDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    serverCancelDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    localCancelDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address:{
      type: DataTypes.STRING,
      allowNull: true
    },
  });
};