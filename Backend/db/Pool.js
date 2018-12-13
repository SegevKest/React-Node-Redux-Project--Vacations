var mysql = require('promise-mysql');

    const pool= mysql.createPool({
        connectionLimit: '10',
        host: "localhost",
        port: 3306,
        user: "root",
        password: "root",
        database: "my_vacations"
    });

module.exports=pool;