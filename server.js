const mysql = require("mysql");
const bodyParser = require("body-parser");
const express = require("express");

var app = express();
app.use(bodyParser.json());

var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "y1o1g1e1s1h1",
    database: "lab5q1",
    multipleStatements: true
})

mysqlConnection.connect((err)=>{
    if(!err){
        console.log("Connected");
    }
    else{
        console.log(err);
    }
})

app.listen(3000);