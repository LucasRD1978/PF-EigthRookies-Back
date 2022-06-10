const Router = require('express');
const { createOrder, orderNotification } = require('../controladores/mercadoController');



const router = Router();

router.post("/", createOrder);
router.post("/notification", orderNotification);




module.exports = router;
