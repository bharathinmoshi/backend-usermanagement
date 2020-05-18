const mongoose = require('mongoose');
Schema = mongoose.Schema;


const rolesSchema = new mongoose.Schema({
    role_name : {
    type: String,
    required: true
},
    created_on:{
        type: Date,
        default: Date.now
},
    updated_on:{
        type: Date,
        default: Date.now
},
    isActive : {
        type  : Boolean,
        default : true
    }
   
});

const Role = module.exports = mongoose.model('roles', rolesSchema);

module.exports.createRoles = (roleObj,callback) =>{
    Role.create(roleObj,(error,data)=>{
        if(error)
        {
            callback(null,{status:false,error})
        }
        else{
            callback({status:true,data})
        }
    })
}

module.exports.updateRoles = (idObj,updateRole_name,callback) =>{ 
    Role.update(
        { _id : idObj }, 
        { "$set": { "role_name": updateRole_name }}, 
        function(error, data) {
         if(error)
         {
             callback(null,{status:false})
         }
         else{
             callback({status:true,data})
         }
      })
}

module.exports.Disablerole = (idObj,callback) =>{ 
    Role.update(
        { _id : idObj }, 
        { "$set": { "isActive": false }}, 
        function(error, data) {
         if(error)
         {
             callback(null,{status:false})
         }
         else{
             callback({status:true,data})
         }
      })
}

