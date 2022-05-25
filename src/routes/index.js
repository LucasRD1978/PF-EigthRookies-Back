const { Router } = require('express');
const routeProd = require('./routeProducts.js');
const routeAdmin = require('./routeAdmin.js');
const routeCategory = require('./routeCategories.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.use("/products", routeProd)
router.use("/admin", routeAdmin)
router.use("/category", routeCategory)


module.exports = router;
