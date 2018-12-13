const express = require('express');
const router = express.Router();
const mysql=require('promise-mysql');
const userControl=require('../modules/user.Controller');
const User=require('../modals/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;


/*  When entering, checking if has session.user, if yes return the req.session
*/
router.get('/', function(req, res, next) {
  if(!req.session.user)
      res.json(0);
  else
      res.json(req.session.user);
});


//isMatch- will be called after blur of the username input
router.post('/checkexist',async function(req,res){
    let answer=await userControl.checkIfExist(req.body.username)
    .catch(err => err);
    if(answer[0])
      res.json(answer[0]);
    else
      res.json({});
});

//Log in - check if has session
router.post('/login', async function(req,res){
  if(req.session.user)
    res.redirect("/public/index.html");
  else
  {
    await userControl.login(req.body.username)
    .then( async data =>{
        let isAdmin=(data[0].isAdmin)[0];
        let hashPassword=data[0].password;
        let match = await bcrypt.compare(req.body.password,hashPassword);
        if(match){
          req.session.user=req.body;
          req.session.user.id=data[0].id;
          req.session.user.firstName=data[0].firstName;
          req.session.user.lastName=data[0].lastName;
          req.session.user.isAdmin= isAdmin === 1 ? true: false;
          res.json(req.session.user);
        }
        else
          res.send("not a matched Password");    
    }).catch(err=>res.send("Not matched User"));
  }
});

// When logOut destroy Session obj
router.get('/logout', function(req,res){
  if(req.session.user)
      req.session.destroy(err=>err);
  res.json({logged:false});
});

//Register
router.post('/register', async function(req, res) {
    let newUser=new User(req.body.firstName,
                          req.body.lastName,
                          req.body.username,
                          req.body.password);
    await bcrypt.hash(newUser.password, saltRounds,function(err,hash){
        if(err) throw err;
        newUser.password=hash;
        userControl.registerUser(newUser);
        res.json(newUser);
    });
});

module.exports = router;
