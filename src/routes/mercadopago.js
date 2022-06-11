const Router = require('express');
const { createOrder, handleStatus } = require('../controladores/mercadoController');



const router = Router();

router.post("/", createOrder);
router.get('/status', handleStatus)

module.exports = router;
