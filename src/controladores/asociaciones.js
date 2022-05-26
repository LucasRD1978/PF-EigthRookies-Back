const { Products, Categories } = require('../db.js')


function asociar(array){
    array.map(async(e)=>{
        let p=await Products.findOne({where:{name:e.name}})
        if(!p){console.log(p)}
        let c = await Categories.findOrCreate({ where: { name: e.category } })
        c[0].addProducts(p)
        array.shift()
    })   
}

module.exports={asociar}
