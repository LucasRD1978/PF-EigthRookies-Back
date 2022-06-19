const { User } = require('../db.js');
const { Router } = require('express');

const route = Router()

route.put('/:id',(req,res,next)=>{
    const{id}=req.params
    const{first_name,last_name,address,phone,postal_code}=req.body

    User.update({
        first_name:first_name,
        last_name:last_name,
        address:address,
        phone:phone*1,
        postal_code:postal_code*1
    },{
        where:{email:id}
    
    })
    .then(async()=>{let r=await User.findOne({where:{email:id}})
        
        return res.status(200).send(r)})
    .catch(()=>next())
})

module.exports=route
