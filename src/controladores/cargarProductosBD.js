
const axios=require('axios')

const{Products,Categories}=require('../db.js')


function cargarCeluraresEnBd(){

    let aux=[]
    let aux1=[]
    let aux2=[]
    for(let i=0;i<10;i++){
        let num=i*50     
        let promesa=axios.get(`https://api.mercadolibre.com/sites/MLA/search?category=MLA1055&offset=${num}`) 
        aux.push(promesa)
        }
    Promise.all(aux)
        .then((r)=>{return r.map((info)=>{return info.data.results})})
        .then(async(r)=>{
            for(let e of r){
                aux1=[...aux1,...e]
            }
            ;console.log(aux1.length,'celulares');aux1=aux1.map(info=>
                {aux2.push(info.domain_id.split('-')[1]);return {
                   // id:info.id,
                    title:info.title,
                    image:info.thumbnail,
                    category:info.domain_id.split('-')[1],
                    price:info.price,
                    name:info.title.split(' ').slice(0,3).join('-')
                    }
                }
            )
            
                
                for(let e of aux1){
                   await Products.findOrCreate({
                       where:{
                   
                       description:e.title,
                       image:e.image,
                        categoria:e.category,
                       price:e.price,
                       name:e.name
                      // id:e.id
                    }
                   })
                }
               // console.log(aux2)
                console.log('carga de celulares completa')
                const naux2=new Set(aux2)
                aux2=Array.from(naux2)
                    for(let e of aux2){
                         await Categories.findOrCreate({
                               where:{name:`${e}`}
                              })
                              
                            }
                            aux1.map(async (e)=>{
                                let p=await Products.findOne({where:{name:e.name}})
                                let c=await Categories.findOrCreate({where:{name:e.category}})
                                c[0].addProducts(p)
                              //  p.addCategories(c[0])
                                       // console.log('uniendo')
                                        
                                                
                                            
                                                                             
                            
                            })                    
                console.log("categorias en celeulares en bd")
            })
          

        .catch((err)=>console.log(err))
        }

function cargarElectronicaEnDb(){    
    let aux=[]
    let aux1=[] 
    let aux2=[]
    for(let i=0;i<10;i++){
        let num=i*50     
        let promesa=axios.get(`https://api.mercadolibre.com/sites/MLA/search?category=MLA1648&offset=${num}`) 
        aux.push(promesa)
        }
    Promise.all(aux)
        .then((r)=>{return r.map((info)=>{return info.data.results})})
        .then(async(r)=>{
            for(let e of r){
                aux1=[...aux1,...e]
            }
            ;console.log(aux1.length,'electronica');aux1=aux1.map(info=>
                {aux2.push(info.domain_id.split('-')[1]);return {
                    //id:info.id,
                    title:info.title,
                    image:info.thumbnail,
                    category:info.domain_id.split('-')[1],
                    price:info.price,
                    name:info.title.split(' ').slice(0,3).join('-')
                    }
                }
            )
            
                
                for(let e of aux1){
                   await Products.findOrCreate({
                       where:{
                       description:e.title,
                       image:e.image,
                       categoria:e.category.split('_').join('-'),
                       price:e.price,
                      // id:`${e.id}`
                        name:e.name
                    }
                   })
                }
                console.log('carga de electronica completa')
        
                const naux2=new Set(aux2)
                aux2=Array.from(naux2)
                    for(e of aux2){
                         await Categories.findOrCreate({
                               where:{name:e}
                              })
                            }
               // console.log(aux1)
                
                      
                console.log("categorias en electronica bd")

                    })
            
    .then(()=>{
        aux1.map(async(e)=>
                 {  let p=await Products.findOne({where:{name:e.name}})
                    let c=await Categories.findOrCreate({where:{name:e.category.split('-').join('')}})
                    console.log(e.category)
                        if(p){
                         c[0].addProducts(p)}
                         else{console.log('no no')}
                          //  console.log(c[0],c.length)
                            
                                    
                                
                                                                 
                
                })       

    })                
   
   .catch((err)=>console.log(err))

}









module.exports={cargarCeluraresEnBd,cargarElectronicaEnDb}