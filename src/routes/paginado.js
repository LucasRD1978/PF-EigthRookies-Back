const {Products, Category} =require('../db.js');
const axios = require('axios');
const { Router } = require('express');

const route = Router()

route.put('/:numeroPagina',(req,res,next)=>{
    //let  estadoArray=[1,2,3,4,5,6,7,8,9,10,11,12,13]
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
      const category = query.category || '';
      // const price = query.price || '';
      // const rating = query.rating || '';
      // const order = query.order || '';
      const searchQuery = query.query || '';


      const queryFilter =
    searchQuery && searchQuery !== 'all'
      ? {
          name: {
            [Sequelize.Op.iLike]: `%` + {searchQuery} + `%`,
          },
        }
      : {};
  const categoryFilter = category && category !== 'all' ? { id: category } : {};

  // const ratingFilter =
  //   rating && rating !== 'all'
  //     ? {
  //         rating: {
  //           [Op.eq]: Number(rating),
  //         },
  //       }
  //     : {};
  // const priceFilter =
  //   price && price !== 'all'
  //     ? {
  //         // 1-50
  //         price: {
  //         [Op.gt]: Number(price.split('-')[0]),
  //         [Op.lt]: Number(price.split('-')[1]),
  //         },
  //       }
  //     : {};
  // const sortOrder =
  //   order === 'featured'
  //     ? { featured: -1 }
  //     : order === 'lowest'
  //     ? { price: 1 }
  //     : order === 'highest'
  //     ? { price: -1 }
  //     : order === 'toprated'
  //     ? { rating: -1 }
  //     : order === 'newest'
  //     ? { createdAt: -1 }
  //     : { _id: -1 };
  

      const products = await Category.findAll({
          where: {
          ...queryFilter,
          ...categoryFilter,
          // ...priceFilter,
          // ...ratingFilter, 
      }, offset: (pageSize * (page - 1)),
          limit: 8,
          subQuery:false, include: [Products],
        })


          const countProducts = await Category.findAndCountAll({
          where:{
              ...queryFilter,
              ...categoryFilter,
              // ...priceFilter,
              // ...ratingFilter,
              },include: [Products], 
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