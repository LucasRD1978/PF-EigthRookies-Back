const { Order, Products, User } = require('../../db.js');

const postAllOrders = async (data) => {
  try {
    const { orderIds } = data;
    // const { user } = data;
    if (orderIds) {
      let fullPrice = 0;
      for (const order of orderIds) {
        const foundOrder = await Order.findByPk(order);
        foundOrder.status = "pending";
        console.log("soy foundOrder.dataValues.productId", foundOrder.dataValues.productId)
        await foundOrder.save();
        const foundProduct = await Products.findOne({where: {id: foundOrder.dataValues.productId}});
        fullPrice = fullPrice + foundOrder.dataValues.amount * foundProduct.dataValues.price;
      }
    //   const foundUser = await User.findOne({ where: { id: user.id } });
    //   await foundUser.addOrder(allOrder);
    console.log("soy fullPrice", fullPrice) 
    return {fullPrice: fullPrice};
    }
  } catch (err) {
    console.log("Error",err);
    return false;
  }
};

module.exports = postAllOrders;