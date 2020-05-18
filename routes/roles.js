var express = require('express');
var router = express.Router();
const Roles = require("../helpers/roles");


router.post('/create',(req, res) => {
    let roleObj = req.body;
    Roles.createRoles(roleObj,(error,data)=>{
        if(error)
        {
            res.send(error)
        }
        else{
            res.send(data)
        }
    })
});

router.post('/edit',(req,res)=>{
    Roles.updateRoles(req.body._id,req.body.role_name,(error,data)=>{
        if(error)
        {
            res.send(error)
        }
        else{
            res.send(data)
        }
    })
})

router.post('/disable',(req,res)=>{
    Roles.Disablerole(req.body._id,(error,data)=>{
        if(error)
        {
            res.send(error)
        }
        else{
            res.send(data)
        }
    })
})

router.get('/getall',(req,res)=>{
    Roles.find(function (err, results) {
        if(err){
            res.send({status: false, err})
        }
    res.send({status: true, results});
      });
})

module.exports = router;