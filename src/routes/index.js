const { Router } = require('express');
const routeProd = require('./routeProducts.js');
const routeAdmin = require('./routeAdmin.js');
const ordenar = require('./ordenar.js');
const filtrar = require('./filtrar.js');
const { route } = require('./routeProducts.js');
const routeCategory = require('./routeCategory');
const paginado = require('./paginado.js');
const orders = require("./orders.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const createProduct = require('./routeCrearProd.js');
const nuevaRuta = require('./nuevaRuta');
const routeUpdateProduct = require('./routeUpdateProduct');
const routeCrearCategory = require('./routeCrearCategory');
const routeUpDateSatock = require('./routeUpDateStock');
const routeUsers = require('./routeUsers');
const mercadoPago = require('./mercadopago');
const routeReview = require('./routeReview');
const routeUpDateProfileUser=require('./routeUpDateProfileUser')
const routeUpDateFunction=require('./routeUpdateFunction')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/filtrar', filtrar);
router.use('/ordenar', ordenar);
router.use("/products", routeProd);
router.use("/admin", routeAdmin);
router.use('/createProduct', createProduct);
router.use('/category', routeCategory);
router.use('/paginado', paginado);
router.use('/nuevaruta', nuevaRuta);
router.use('/order', orders);

router.use('/updateproduct',routeUpdateProduct)
router.use('/crearcategory',routeCrearCategory)
router.use('/stock',routeUpDateSatock)
router.use('/users',routeUsers)

router.use('/update/profileuser',routeUpDateProfileUser)
router.use('/updatefunction',routeUpDateFunction)





router.use("/mercadopay", mercadoPago);
router.use('/routeReview', routeReview);


module.exports = router;
