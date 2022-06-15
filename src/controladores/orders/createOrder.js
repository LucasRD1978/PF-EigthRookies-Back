const {Order, User, Products} = require('../../db.js');
const Sequelize = require('sequelize')

const createOrder = async (status, amount, emailID, productId) => {
    const orderAmount = amount || 1 ;
    try {
         const foundUser = await User.findByPk(emailID)

        const foundProduct = await Products.findOne({ where: {id: productId}})
        if (foundProduct && foundUser) {
        const existingOrder = await Order.findOne({ 
            where: {status: status, productId: productId, userEmail: emailID},
            })

        if(!existingOrder) {
            const newOrder = await Order.create({
                status: status,
                amount: orderAmount
            })
        await foundUser.addOrder(newOrder);
        await foundProduct.addOrder(newOrder);
        } else {
        existingOrder.amount = existingOrder.amount + Number(orderAmount);
        await existingOrder.save();
            }
        return true
        }
    return false
    } catch (error) {
        console.log(error)
        return false;
    }
}

module.exports = createOrder;
