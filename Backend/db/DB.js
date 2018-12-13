const mysql = require('promise-mysql');
const pool=require('./Pool');
var express = require('express');
var app = express();
const bcrypt = require('bcrypt');
const saltRounds = 10;

//Socket.io define
const server=require('http').createServer(app);
const io=require('socket.io')(server);


module.exports = {

    tempPool: mysql.createPool({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "root"
    }),
    
    addAdmin: async function(){
        let adminObj={
            username:'Segev',
            password:'Segev',
            firstName:'Segev',
            lastName:'Segev',
            isAdmin: true
        };
        // Build Single Admin and Insert to DB
        const sqlInsertAdmin = 'INSERT INTO users SET ?';
        await bcrypt.hash(adminObj.password, saltRounds,function(err,hash){
            if(err) throw err;
            adminObj.password=hash;
            return pool.query(sqlInsertAdmin,adminObj);
        });
    },

    buildDb: function () {
        // Build DB
        const sqlBuildDB = "CREATE DATABASE IF NOT EXISTS vacations";
        // Build Users Table
        const sqlBuildUsers = `CREATE TABLE IF NOT EXISTS users(
                        id INT NOT NULL AUTO_INCREMENT,
                        username VARCHAR(500) NULL,
                        password VARCHAR(500) NULL,
                        firstName VARCHAR(255) NULL,
                        lastName VARCHAR(255) NULL,
                        isAdmin BIT(1) DEFAULT 0,
                        PRIMARY KEY (id))
                        `;
        // Build Followers Table
        const sqlBuildFollowers = `CREATE TABLE IF NOT EXISTS my_vacations.followers (
                        vacationid INT NOT NULL,
                        userid INT NOT NULL,
                        PRIMARY KEY (vacationid, userid))`;
        // Build Vacations Table
        const sqlBuildVacations = `CREATE TABLE IF NOT EXISTS vacations (
                        id INT NOT NULL AUTO_INCREMENT,
                        description VARCHAR(255) NULL,
                        destination VARCHAR(255) NULL,
                        img VARCHAR(500) NULL,
                        startDate DATE NULL,
                        endDate DATE NULL,
                        cost INT NULL,
                        followed INT NULL,
                        PRIMARY KEY (id))`;
        this.tempPool.getConnection().then(function (connection) {
            connection.query(sqlBuildDB)
            .then((results)=>{
                if(typeof results !== "undefined" && results.warningCount === 0)
                    return pool.query(sqlBuildUsers);
            })
            .then((results)=>{
                if(typeof results !== "undefined" && results.warningCount === 0)
                    return pool.query(sqlBuildFollowers);
            })
            .then((results)=>{
                if(typeof results !== "undefined" && results.warningCount === 0)
                    return pool.query(sqlBuildVacations);
            })
            .then((results)=>{
                if(typeof results !== "undefined" && results.warningCount === 0)
                    return this.addAdmin();
            })
        });
    }
}


