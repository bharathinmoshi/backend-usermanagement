const mongoose = require('mongoose');
Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
const config = require("../config");
var jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    user_name : {
        type : String,
        required: true
},
    user_mobile_no : {
    type:Number,
    required:true,
    unique:true
    },
     role_name : {
        type : String,
        required : true
 },
    user_password : {
        type  :String,
        required : true
 },
    about_me : {
        type : String,
        required : true
 },
    created_on:{
        type: Date,
        default: Date.now
},
    updated_on:{
        type: Date,
        default: Date.now
},
   isActive:
   {
       type:Boolean,
       default : true
   }
});

const User = module.exports = mongoose.model('user', userSchema);

module.exports.addUser = (userObj,callback) => 
{
  User.create(userObj,(error,data)=>{
    if(error)
    {
      callback({status:false},null)
    }
    else{
        if(data)
        {
            const salt = bcrypt.genSaltSync(10)
            const password =  data.user_password;
            data.user_password = bcrypt.hashSync(password, salt); 
            data.save().then(function(data)
                 {
                    callback({status:true,data})   
                 });
        }
    }
  })
} 

module.exports.loginUser = (loginObj,callback) =>
{
   User.findOne({user_mobile_no : loginObj.user_mobile_no},function(error,user)
   {
       if(!user)
       {
           callback({status: false, data: "User Not Found"})
       }
       else
       {
        if(user)
        {
            let hashpassword =  bcrypt.compareSync( loginObj.user_password , user.user_password);
            if(hashpassword){
                let payload = {username : user.user_mobile_no , _id:user._id};
                let options = {
                 expiresIn: config.jwt.timeout
                };
                
                jwt.sign(payload , config.jwt.key , options , function (error , token) {
                  if(error){
                   let obj = {status: false, data: error};
                   callback(obj);
                  }
                  else{
                   user = user.toJSON();
                 callback({status:true,data:token});
                  }
                });
              }
              else{
                callback({status:false,data:"Password MisMatch"});
              }
        }
       }
    
   })
}

module.exports.updateUser = (updateObj,callback) =>{
    User.findOneAndUpdate({_id:updateObj._id},{$set:updateObj}, {new: true}, (error, doc) => {
     if(error)
     {
        callback(null,{status:false,data:error})
     }
     else
     {
         if(doc)
         {
            callback({status:true,data:doc})
         }
     }
    })
}




