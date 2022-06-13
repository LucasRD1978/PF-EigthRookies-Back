const Router = require('express');
const { createOrder, handleStatus } = require('../controladores/mercadoController');
const changeOrderStatus = require('../controladores/orders/changeOrderStatus');



const router = Router();

router.post("/", createOrder);
router.get('/status', handleStatus);
router.put("/", async function (req, res) {
    try {
        const data = req.body;
        const changedOrder= await changeOrderStatus(data);
        if(changedOrder){
        return res.send(changedOrder)
        }
    return res.send({ error: "couldn't change order" });
    } catch (err) {
        console.log(err);
    
      }
    });

module.exports = router;
