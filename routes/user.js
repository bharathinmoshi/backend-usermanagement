var express = require('express');
var router = express.Router();

const User = require("../helpers/user");

router.post('/create',(req, res) => {
    let userObj = req.body;
    User.addUser(userObj,(error,data)=>{
        if(error)
        {
            res.send(error)
        }
        else{
            res.send(data)
        }
    })
});

router.post('/login', (req, res)  => {
    let userObj = req.body;
    User.loginUser(userObj, (error, data) => {
        if(error)
        {
            res.send(error)
        }
        else{
            res.send(data)
        }
      });
  });

  router.post('/edit-user',(req,res)=>{
      let updateObj = req.body;
    User.updateUser(updateObj,(error,data)=>{
        if(error)
        {
            res.send(error)
        }
        else{
          if(data)
          {
              res.send(data)
          }
        }
    })
  })

  router.get('/getall',(req,res)=>{
    User.find(function (err, results) {
        if(err){
            res.send({status: false, err})
        }
    res.send({status: true, results});
      });
})

module.exports = router;