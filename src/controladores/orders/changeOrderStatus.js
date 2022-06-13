const {Order, ShoppingCar, Products} = require('../../db.js');

const changeOrderStatus = async (data) => {
    
    try {
        const { ordersIds, purchaseId } = data;
      
        const newShoppingCar = await ShoppingCar.findOne({where: {payment_id: purchaseId}});
        let fullPrice = 0;
        for (const order of ordersIds) {
        const foundOrder = await Order.findByPk(order);
            if(foundOrder){
            const foundProduct = await Products.findOne({where: {id: foundOrder.productId}});
            fullPrice = fullPrice + foundOrder.amount * foundProduct.price;
            foundOrder.status = "finished";
            foundOrder.purchaseId = purchaseId
            foundOrder.save();
            newShoppingCar.addOrder(foundOrder);
            }
        }
        newShoppingCar.fullPrice = fullPrice
        newShoppingCar.save()
    return newShoppingCar;
} catch (error) {
    console.log(error)
    return false;
}
}

module.exports = changeOrderStatus;