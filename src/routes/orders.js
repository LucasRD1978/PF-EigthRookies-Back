const { Order, User, Products } = require('../../db.js');

const createOrder = async (status, amount, user, productId) => {
  try {
    const foundUser = await User.findOne({ where: { id: user.id } });
    const foundProduct = await Products.findOne({ where: { id: productId } });
    if (foundUser && foundProduct) {
      if (status === 'finished' || status === 'pending') {
        // if (foundProduct.stock < amount) {
        //   return { error: "There's not enough stock." };
        // }
      }
      const existingOrder = await Order.findOne({
        where: { userId: user.id, productId: productId, status: status },
      });
      if (!existingOrder) {
        const newOrder = await Order.create({
          status: status,
          amount: amount,
        });
        await foundUser.addOrder(newOrder);
        await foundProduct.addOrder(newOrder);
      } else {
        existingOrder.amount = existingOrder.amount + Number(amount);
        await existingOrder.save();
      }
      if (status === 'finished') {
        foundProduct.stock = foundProduct.stock - Number(amount);
        foundProduct.save();
      }
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
//order model 
module.exports = createOrder;