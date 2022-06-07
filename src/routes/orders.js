
const { Router } = require('express');
const createOrder = require('../controladores/orders/createOrder.js');
const deleteOrder = require('../controladores/orders/deleteOrder.js');
const getProductsOrder = require('../controladores/orders/getProductsOrder.js')


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

route.put('/:id', async function (req, res) {
  try {
    const { status, amount, date, purchaseId } = req.body;
    const { id } = req.params;
    if (status) {
      const orderChanged = await changeOrderStatus(
        id,
        status,
        date,
        purchaseId
      );
      if (typeof orderChanged !== 'boolean') {
        return res.send(orderChanged);
      } else if (orderChanged) {
        return res.send({ msg: 'status changed' });
      }
    } else if (amount) {
      const orderChanged = await changeOrderAmount(id, amount);
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

  module.exports = route;