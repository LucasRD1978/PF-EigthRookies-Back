const {Router} = require('express');
const {Products, Review, User, Category, Order} = require('../db');
const {Op} = require('sequelize');

const route = Router();

//Ruta para buscar los review por producto
route.get('/:productId/review', (req, res) => {
    const {productId} = req.params;

    return Review.findAll({
        where: {productId},
        include: Products
    })
    
    .then((reviews) => {
        return res.status(200).json({
            message: 'Success',
            data: reviews,
        });
    })

    .catch((err) => {
        return res.status(404).json({
            message: 'El review solicitado no se encuentra en la base de datos',
            data: err
        })
    })

});

//Ruta para encontrar las review por producto y por usuario
route.get('/:productId/review/user/:userEmail', (req, res) =>{

    const {productId, userEmail} = req.params;

    return Review.findAll({
        where: {productId, userEmail}
    })

    .then ((review) => {
        return res.status(200).json({
            message: 'Success',
            data: review
        });
    })

    .catch((err) => {
        return res.status(404).json({
            message: 'El review solicitado no se encuentra en la base de datos',
            data: err
        });
    })

});

//Ruta para crear una review
route.post('/:productId', (req, res) => {
    
    const {productId} = req.params;
    const { title, rate, content, userEmail} = req.body;

    return Review.create({ productId, title, content, rate, userEmail})
    .then(() => {
        return Products.findAll({
            include: [{model: Category}, {model: Review}]
        })
        .then((products) => {
            return res.status(200).json({
                message: 'Se ha creado su comentario exitosamente',
                data: products
            })
        })
    })
    .catch((err) => {
        return res.status(500).json({
            message: 'Error al crear comentario',
            data: err
        })
    })
})

//Ruta para modificar una review
route.put('/:productId/review/:id', (req, res) => {
    
    const {productId, id} = req.params;
    const {title, content, rate, creatorEmail} = req.body;

    Review.findOne({
        where: {productId, id},
        include: Products,
    })
    .then((review) =>{
        review.title = title,
        review.content = content,
        review.rate = rate;
        review.save();
        return res.status(200).json({
            message: 'Comentario actualizado correctamente',
            data: review,
        })
    })
    .catch((err) => {
        return res.status(500).json({
            message:'Error al actualizar el comentario',
            data: err,
        })
    })
});

//Ruta para borrar Review
route.delete('/:productId/review/:id', (req, res) => {

    const {productId, id} = req.params;

    Review.findOne({
        where: {productId, id},
        include: Products,
    })
    .then((review) => {
        review.destroy();
        return res.status(200).json({
            message: 'Comentario eleiminado correctamente',
            data: review
        })
    })
    .catch((err) => {
        return res.status(500).json({
            message: 'Hubo un error al eliminar el comentario',
            data: err
        })
    })
})

route.get('/pagado', async (req,res,next)=>{
    const { userEmail, productId} = req.query;
    try{
    const result = await Order.findAll({
        where:{status:'finished',userEmail:userEmail, productId: productId}
        })

        if(result.length){
            res.status(200).send(true)
        } else res.status(400).send(false)
    } catch(error){
        console.log(error,"Error en el proceso de consulta")
        next();
    }

    
})

module.exports = route