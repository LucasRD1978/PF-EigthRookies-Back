const {Order, User, Products} = require('../../db.js');
const Sequelize = require('sequelize')

const createOrder = async (status, amount, user, productId) => {
    try {
        // const foundUser = await User.findOne({ where: {id: user.id}})
        const foundProduct = await Products.findOne({ where: {id: productId}})
        if (foundUser && foundProduct) {
        const existingOrder = await Order.findOne({ 
            where: {  status: status, productId: productId}
            })
        if(!existingOrder) {
            const newOrder = await Order.create({
                status: status,
                amount: amount
            })
        await foundUser.addOrder(newOrder);
        await foundProduct.addOrder(newOrder);
        } else {
        existingOrder.amount = existingOrder.amount + Number(amount);
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