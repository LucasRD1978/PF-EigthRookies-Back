const {Rol} = require('../db');

// let primerosUserios = [{email:'mauro@gmail.com', first_name:'mauro', last_name:'Perez' ,image:'', password:'123456', phone:'4581212', postal_code:'2500', address:'av. sol', admin:'cliente', cities:'Rosario' },
// {email:'maria@gmail.com', first_name:'Maria', last_name:'Gonzalez' ,image:'', password:'123456', phone:'4581212', postal_code:'2500', address:'av. sol', admin:'administrativo', cities:'Rosario' }]

//  function cargaUsuario(primerosUserios){
//     primerosUserios.map(async (el) => {
//      await Rol.findOrCreate({

//         where: {
//             type: el.admin
//         }
//     })
// })
// }
async function usuariosDb (){ 
    await Rol.bulkCreate([
    {type:'cliente'},
    {type:'administrador'}
  ])
}

module.exports = {usuariosDb};

