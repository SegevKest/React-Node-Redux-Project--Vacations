var mysql=require('promise-mysql');
var pool=require('../db/Pool');

module.exports={
    
//Every time the User followes or increas a follow from vacations
    addFollower:(vacationId,userId)=>{
        const tableRow={vacationid:vacationId,
                        userid:userId   };
        const sql=`INSERT INTO followers SET ?`;
        return pool.query(sql,tableRow);
    },
    deleteFollower:(vacationId,userId)=>{
        const sql=`DELETE FROM followers WHERE vacationid= ? AND userid= ?`;
        return pool.query(sql,[vacationId,userId]);
    }
};


  