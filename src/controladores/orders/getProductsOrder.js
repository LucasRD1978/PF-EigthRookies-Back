const { Order, Products, Category } = require('../../db.js');
const Sequelize = require('sequelize')
const {Op} = Sequelize.Op


const getProductsOrder = async (status, user, purchaseId) => {
  let whereStatement = ''

  try {
    if(status === "finished"){
      whereStatement = { where: { status: status, userEmail: user, purchaseId: purchaseId } };
    } else {
      whereStatement = { where: { status: status, userEmail: user } }
    }
  
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
      order:[["name","ASC"]]
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
