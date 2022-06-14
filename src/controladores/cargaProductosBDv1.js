
const axios=require('axios')
const {asociar}=require('./asociaciones')
const{Products,Category}=require('../db.js')
function CargarTodo(){

let aux=[]
let aux1=[]
let aux2=[]
for(let i=0;i<10;i++){
    let num=i*50     
    let promesa=axios.get(`https://api.mercadolibre.com/sites/MLA/search?category=MLA1055&offset=${num}`) 
    aux.push(promesa)
    let promesa2=axios.get(`https://api.mercadolibre.com/sites/MLA/search?category=MLA1648&offset=${num}`) 
    aux.push(promesa2)
    }
    Promise.all(aux)
        .then((r)=>{return r.map((info)=>{return info.data.results})})
        .then(async(r)=>{
            for(let e of r){
                aux1=[...aux1,...e]
            }
            ;console.log(aux1.length,'electronica');aux1=aux1.map(info=>
                {aux2.push(info.domain_id.split('-')[1]);return {
                    id:info.id,
                    title:info.title,
                    image:`https://http2.mlstatic.com/D_NQ_NP_${info.thumbnail_id}-O.webp`,
                    category:info.domain_id.split('-')[1],
                    price:info.price,
                    name:info.title.split(' ').slice(0,3).join('-'),
                
                    }
                })
                for(let e of aux1){
                    await Products.findOrCreate({
                        where:{
                        description:e.title,
                        image:e.image,
                        id:e.id,
                        amount:10,
                        price:e.price,
                        name:e.name,
                    }})}
                for(let e of aux1){
                    await Category.findOrCreate({
                        where:{name:e.category}
                    })
                }    
               // asociar(aux1)    
               // console.log('alf')    
        


            })
    
        .then(()=>{asociar(aux1);console.log('..ready')})    
    }
     




module.exports={CargarTodo}

