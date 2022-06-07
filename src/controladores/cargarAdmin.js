
const{User}=require('../db.js')



const arrObj=[
    {
    email:'leorodr4446@gmail.com',
    first_name:'leonardo', 
    last_name:'rodriguez',
    functions:'admin'

    },
    {
        email:'algunocualquiera@gmail.com',
        first_name:'pablito',
        last_name:'marmol',
        
    }
]

function cargarUsuario(arrObj){

    arrObj.map(async(e)=>{
        await User.findOrCreate({
            where:{
            email:e.email,
            first_name:e.first_name,
            last_name:e.last_name,
            functions:e.functions?e.functions:'usuario'}
        })
    })


}
module.exports={cargarUsuario,arrObj}