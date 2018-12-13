var express = require('express');
var vacationController = require('../modules/vacation.Controller');
var router = express.Router();
const io =require('socket.io')();
io.listen(3008);

function emitVacations(){
    //Sends only the event with socket, when catching the event, in client load all vacations from DB
    io.emit('UPDATE_VACATIONS');
}

router.get('/', async function(req, res) {
    try{
            let allVacations=await vacationController.getAllVacations();
            res.json(allVacations);
    }
    catch (err){
            throw err;  
    }   
});

router.post('/', async function(req, res) {
    try{
        let newVacation=req.body;
        let addedVacation=await vacationController.addNewVacation(newVacation);
        emitVacations();
        res.json(addedVacation);
    }
    catch(err)  {
        typeof err === 'string' ? res.send(err) : res.sendStatus(500);
    }
  });

router.put('/:id', async function(req, res) {
    try{
        let newVacation=req.body;
        let updated=await vacationController.updateVacation(req.params.id, newVacation);
        emitVacations();
        res.json(newVacation); // will return 1 if updated, 0 if wrong
    }
    catch(err)    {
        typeof err === 'string' ? res.send(err) : res.sendStatus(500);
        }
});

router.delete('/:id', async function(req, res) {
    try{
        let deleted=await vacationController.deleteVacation(req.params.id)
        emitVacations();
        res.json(deleted); // will return 1 if updated, 0 if wrong
    }
    catch (err){
        typeof err === 'string' ? res.send(err) : res.sendStatus(500);
    }
});

router.get('/statistic', async function(req,res){

    try {
        let followedArr= await vacationController.getStats();
        res.json(followedArr);
    }
    catch(err) {
        typeof err === 'string' ? res.send(err) : res.sendStatus(500);
    }
})

module.exports=router;