const {Products, Category} =require('../db.js');
const axios = require('axios');
const { Router } = require('express');
const{Op}=require('sequelize')

const route = Router()

route.put('/:numeroPagina',(req,res,next)=>{

    const{numeroPagina}=req.params
    const{estadoArray}=req.body
    let cantidadEnVista=3
    let fin=cantidadEnVista*numeroPagina
    let mostrar=estadoArray.slice(fin-cantidadEnVista,fin)
    return res.send(mostrar)


})

route.get(
  '/search', async (req, res) => {
      const { query } = req;
      const pageSize = query.pageSize || 8;
      const page = query.page || 1;
      const category = query.category*1 || '';
    const price = query.price || '';
      const order = query.order || '';
      const searchQuery = query.query || '';

      const queryFilter =
    searchQuery && searchQuery !== 'all'
      ? {
        name: {
          [Op.iLike]: '%'+`${searchQuery.split(' ').join('-')}`+'%'
      }
        }
      : {};
    
    const categoryFilter = category && category !== 'all' ? { id: category } : {};
  const priceFilter =
  price && price !== '' 
  ? { price: {[Op.lte]: Number(price) ,
          },
        } 
      : {} ;


  const sortOrder =
    order === 'A-Z'
      ? {order:[["name","ASC"]]}
      : order === 'Z-A'
      ? {order:[["name","DESC"]]}
      : order === 'ASC'
      ? {order:[["price","ASC"]]}
      : order === 'DESC'
      ? {order:[["price","DESC"]]}:
      {}
      

      const products = await Products.findAll({
      
        where: {
          ...queryFilter,
          ...priceFilter,
          // ...ratingFilter,
        },
        offset: (pageSize * (page - 1)),
        limit: 8,
        include: [{
          model:Category,
          where: {...categoryFilter,},
        }],
        ...sortOrder,
        })


          const countProducts = await Products.findAndCountAll({
            where: {
              ...queryFilter,
              ...priceFilter,
            },
            include: [{
              model:Category,
              where: {...categoryFilter,},
            }],
          ...sortOrder,
          })

  try {
      res.send({
          products,
          countProducts,
          page,
          pages: Math.ceil(countProducts.count / pageSize),
        });
      
  } catch (error) {
      console.log(error)
  }
   
  })

module.exports=route
