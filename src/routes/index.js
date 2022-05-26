const { Router } = require('express');
const routeProd = require('./routeProducts.js');
const routeAdmin = require('./routeAdmin.js');

const ordenar=require('./ordenar.js')
const filtrar=require('./filtrar.js');
const { route } = require('./routeProducts.js');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/filtrar',filtrar)
router.use('/ordenar',ordenar)
router.use("/products", routeProd)
router.use("/admin", routeAdmin)
router.use("/category", routeCategory)


module.exports = router;
