var mysql=require('promise-mysql');
var pool=require('../db/Pool');

module.exports={

    checkIfExist:(username)=>{ //When register,works
        let sql=`SELECT * FROM users Where username= ? `;
        return pool.query(sql,username);
    },

    registerUser:(userObj)=>{ //works
        const user={username:userObj.username,
                    password:userObj.password,
                    firstName:userObj.firstName,
                    lastName:userObj.lastName,
                    followedArr:userObj.followedArr};
        let sql=`INSERT INTO users SET ? `;
        return pool.query(sql,user);
    },

    login:(username)=>{ //works
        let sql=`SELECT id, firstName,lastName,password, isAdmin FROM users 
        WHERE username = ?`;
        return pool.query(sql,username);
    },

    getCurrentUser:(username)=>{ 
        // Gets the specific loggedIN user, adds him to the state
        let sql=`SELECT firstName, lastName, followed FROM users WHERE username= ? `;
        return pool.query(sql,username);
    }
};
