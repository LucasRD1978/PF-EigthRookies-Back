const { Order, Products, Category } = require('../../db.js');
const Sequelize = require('sequelize')
const {Op} = Sequelize.Op


const getProductsOrder = async (status) => {
  try {
    console.log("soy status", status)
    let whereStatement = { where: { status: status}}
    console.log("soy whereStatement", whereStatement)
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
    return true
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = getProductsOrder;