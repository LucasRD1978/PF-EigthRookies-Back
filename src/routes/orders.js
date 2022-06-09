
const { Router } = require('express');
const createOrder = require('../controladores/orders/createOrder.js');
const deleteOrder = require('../controladores/orders/deleteOrder.js');
const getProductsOrder = require('../controladores/orders/getProductsOrder.js');
const putOrder = require('../controladores/orders/putOrder.js');
const postAllOrders = require('../controladores/orders/postAllOrders.js');


const route = Router()

route.post("", async(req, res) => {
    const {status, amount , user, productId} = req.body;
    try {
        const created = await createOrder(status, amount, user, productId)
    if (typeof created !== 'boolean') {
      return res.send(created);
        } else if (created) {
        return res.send({ msg: 'order created' });
        }
    return res.send({ error: "couldn't create order" });
    } catch (error) {
        console.log(error)
    }
})

route.put('', async function (req, res) {
  try {
    const { status, amount, productId } = req.body;
    if (amount) { //si cambia el amount
      const orderChanged = await putOrder(productId, amount, status);
      if (typeof orderChanged !== 'boolean') {
        return res.send(orderChanged);
      } else if (orderChanged) {
        return res.send({ msg: 'amount changed' });
      }
    }

    return res.send({ error: "couldn't edit order" });
  } catch (err) {
    console.log(err);
  }
});

route.get('', async (req, res) =>{
    try {
    const { status } = req.query;
    const cart = await getProductsOrder(status);
    if (cart) {
      return res.send(cart);
    }
    res.send({ error: "couldn't find orders" });
    } catch (err) {
      console.log(err);
    }
  });

  route.delete('/:id', async function (req, res) {
    try {
      const { id } = req.params;

      const orderDeleted = await deleteOrder(id);
      if (orderDeleted) {
        return res.send({ msg: 'order deleted' });
      }
      return res.send({ error: "couldn't find order" });
    } catch (err) {
      console.log(err);
    }
  });

  route.post('/postAllOrders', async function (req, res) {
    try {
      const { orderIds } = req.body;
      // const user = req.user.user;
      console.log("soy req.body", req.body)
      const created = await postAllOrders({ orderIds });
      if (typeof created !== 'boolean') {
        console.log("created", created)
        return res.send(created);
      } else if (created) {
        return res.send({ msg: 'all order created' });
      }
      return res.send({ error: "couldn't create all order" });
    } catch (err) {
      console.log(err);
    }
  });

  module.exports = route;