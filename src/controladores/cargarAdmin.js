
const{User}=require('../db.js')



const arrObj=[
    {
        email: 'leorodr4446@gmail.com',
        first_name: 'Leonardo',
        last_name: 'Rodriguez',
        functions: 'admin'

    },
    {
        email: 'berrfarias@gmail.com',
        first_name: 'Bernardo',
        last_name: 'Farias',
        functions: 'admin'
    
    },
    {
        email: 'luisenriquegrosso@gmail.com',
        first_name: 'Luis',
        last_name: 'Grosso',
        functions: 'admin'
        
    },    
    {
        email: 'leme.310589@gmail.com',
        first_name: 'Leonardo',
        last_name: 'Montilla',
        functions: 'admin'
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
