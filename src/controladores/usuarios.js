const {Rol} = require('../db');
// carga de roles
async function usuariosDb (){ 
    await Rol.bulkCreate([
    {type:'cliente'},
    {type:'administrador'}
  ])
}

module.exports = {usuariosDb};

