var mysql=require('promise-mysql');
var pool=require('../db/Pool');


module.exports={

    getAllVacations:()=>{   // Admin and user
        let sql=`SELECT * FROM vacations`;
        return pool.query(sql);
    },
    getAllVacationsWithFollowers:(userId)=>{   // Admin and user
        let sql=`SELECT v.*, NOT ISNULL(f.userid) AS follows FROM my_vacations.vacations v
         LEFT JOIN  my_vacations.followers f ON v.id=f.vacationid AND f.userid= ? `;
        return pool.query(sql,userId);
    },
    addNewVacation:(vacationObj)=>{ //Admin :works
        const sql=`INSERT INTO my_vacations.vacations SET ?`
        return pool.query(sql,vacationObj); 
    },
    updateVacation:(id, vacationObj)=>{ //Admin : works
        const sql=`UPDATE my_vacations.vacations SET ? WHERE id = ?`;
        return pool.query(sql,[vacationObj, id]); 
    },
    deleteVacation:(id)=>{  //Admin : works
        const sql=`DELETE FROM my_vacations.vacations WHERE ID= ? `;
        return pool.query(sql,id); 
    },
    getStats:()=>{
        const sql=`SELECT COUNT(*) AS followers, f.vacationid,
         v.destination FROM my_vacations.followers f JOIN 
         my_vacations.vacations v ON f.vacationid = v.id GROUP BY vacationid`;
        return pool.query(sql);
        },
    getAllFollowers:()=>{
        const sql= `SELECT COUNT(*) AS followers, f.vacationid 
            FROM my_vacations.followers f 
            JOIN my_vacations.vacations v
            ON f.vacationid = v.id GROUP BY vacationid`;
        return pool.query(sql);
    }


};
