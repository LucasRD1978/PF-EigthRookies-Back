const { Router } = require('express');
const routeProd = require('./routeProducts.js');
const routeAdmin = require('./routeAdmin.js');
const ordenar=require('./ordenar.js')
const filtrar=require('./filtrar.js');
const { route } = require('./routeProducts.js');
const routeCategory = require('./routeCategory');
const paginado=require('./paginado.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const createProduct=require('./routeCrearProd.js')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/filtrar',filtrar)
router.use('/ordenar',ordenar)
router.use("/products", routeProd)
router.use("/admin", routeAdmin)
router.use('/createProduct',createProduct)
router.use('/category',routeCategory)
router.use('/paginado',paginado)

module.exports = router;
