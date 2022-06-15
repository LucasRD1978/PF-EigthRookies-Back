const { User, ShoppingCar } = require('../db');

async function createHistoryPurchase(shopping, email) {
    try {
        const user = await User.findOne({
            where: {
                email: email
            }
        });

        if (user) {
            await user.addShoppingCar(shopping);
        }

    } catch (error) {
        console.error(error);
    }
}

module.exports = createHistoryPurchase;
