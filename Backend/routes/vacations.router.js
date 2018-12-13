const express = require('express');
const router = express.Router();
const vacationController=require('../modules/vacation.Controller');
const userController=require('../modules/user.Controller');
const followController= require('../modules/follow.Controller');

// Will use to set the routes of the users in the web

// router.get('/',async function(req,res){
//     let allVacations= await vacationController.getAllVacations();
//     res.json(allVacations);
// });
router.post('/',async function(req,res){
    let allVacations= await vacationController.getAllVacationsWithFollowers(req.body.userid);
    res.json(allVacations);
});

// IN Build- with req.session.user.id
// router.post('/',async function(req,res){
//     let allVacations= await vacationController.getAllVacationsWithFollowers(req.session.user.id);
//     res.json(allVacations);
// });

router.post('/addfollow', async function(req,res){
    try{
        let added= await followController.addFollower(req.body.vacationid,req.body.userid);   
        res.json({follow:'added'});
    }
    catch (err){
        res.send(err);
    }
});

router.delete('/deletefollow', async function(req,res){
    try{
        let deleted= await followController.deleteFollower(req.body.vacationid,req.body.userid);
        res.json({follow:'deleted'});
    }
    catch(err){
        res.send(err);
    }
});

router.get('/allfollowers',async function(req,res){
     try{
        let allFollowers= await vacationController.getAllFollowers();
        res.json(allFollowers); 
     }
     catch(err){
        res.send(err);
     }
})


module.exports=router;
