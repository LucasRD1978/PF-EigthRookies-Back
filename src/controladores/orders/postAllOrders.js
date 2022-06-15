const { User } = require('../../db.js');

const postAllOrders = async (data) => {
  try {
    const { user, address } = data;
    if (user) {
        const foundUser = await User.findByPk(user);
        if(foundUser){
        foundUser.address = address
        foundUser.save()
        }
    return foundUser;
    }
  } catch (err) {
    console.log("Error",err);
    return false;
  }
};

module.exports = postAllOrders;