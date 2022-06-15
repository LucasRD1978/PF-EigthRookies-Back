const { Order } = require('../../db.js');

const putOrder = async (productId, amount, status, user) => {
    try {
      const order = await Order.findOne({ where: { productId , status, userEmail: user} });
      if (order) {
        if (Number(order.amount) + Number(amount) < 1) {
          await Order.destroy({ where: { productId , status} });
    
          return true;
        }
        order.amount = Number(order.amount) + Number(amount);
        await order.save();
    
        return true;
      }
    return false;
    } catch(err){
      console.log(err);
      return false;
    }
  };
  

module.exports = putOrder;