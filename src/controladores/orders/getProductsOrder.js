const { Order, Products, Category } = require('../../db.js');
const Sequelize = require('sequelize')
const {Op} = Sequelize.Op


const getProductsOrder = async (status) => {
  try {
    let whereStatement = { where: { status: status}}
    const inCartProducts = await Products.findAll({
      attributes: ['name', 'id', "price", 'description', "image"],
      include: [
        {
          model: Order,
          ...whereStatement,
        },
        {
          model: Category,
          attributes: ["name"],
        },
      ],
    });
    if (inCartProducts.length > 0) {
      return inCartProducts;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = getProductsOrder;