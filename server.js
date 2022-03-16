const mysql = require("mysql");
const bodyParser = require("body-parser");
const express = require("express");
const https = require("https");
const userRoutes = require("./routes/user");
const userdetailsRoutes = require("./routes/userdetails");
const transactionRoutes = require("./routes/transaction");
const contactRoutes = require("./routes/contact");
const mysqlConnection = require("./connection");

var app = express();
app.use(bodyParser.json());

app.use(
    express.urlencoded({
      extended: true,
    })
  );

app.use("/user", userRoutes);
app.use("/userdetails", userdetailsRoutes);
app.use("/transaction", transactionRoutes);
app.use("/contact", contactRoutes);

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
  });

//DELETE method to delete entries
app.delete("/deleteuser",(req,res)=>{
    mysqlConnection.query("DELETE FROM user WHERE user_id = ?", [req.body.id],(err,rows,fields)=>{
        if(!err)
        res.send("Deleted Successfully");
        else
        console.log(err);
    })
})

//POST method to add new entries
app.post("/adduser",(req,res)=>{
    let emp = req.body;
    var sql = "SET @user_id = ?; SET @Fname = ?; SET @Mname = ?; SET @Lname = ?; SET @password = ?; SET @balance = ?; SET @account_no = ?; SET @type = ?; SET @phone = ?; SET @aadhar_no = ?; SET @image = ?; SET @pin = ?; SET @age = ?; CALL UserAdd(@user_id,@Fname,@Mname,@Lname,@password,@balance,@account_no,@type,@phone,@aadhar_no,@image,@pin,@age);";
    mysqlConnection.query(sql,[emp.user_id,emp.Fname,emp.Mname,emp.Lname,emp.password,emp.balance,emp.account_no,emp.type,emp.phone,emp.aadhar_no,emp.image,emp.pin,emp.age], (err, rows, fields) => {
        if(!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send("Inserted : " + element[0].Cno);
            });
        else
        console.log(err);
    })
})

//PUT method to update entries
app.put("/updateuser",(req,res)=>{
    let emp = req.body;
    var sql = "SET @user_id = ?; SET @Fname = ?; SET @Mname = ?; SET @Lname = ?; SET @password = ?; SET @balance = ?; SET @account_no = ?; SET @type = ?; SET @phone = ?; SET @aadhar_no = ?; SET @image = ?; SET @pin = ?; SET @age = ?; CALL UserUpdate(@user_id,@Fname,@Mname,@Lname,@password,@balance,@account_no,@type,@phone,@aadhar_no,@image,@pin,@age);";
    mysqlConnection.query(sql,[emp.user_id,emp.Fname,emp.Mname,emp.Lname,emp.password,emp.balance,emp.account_no,emp.type,emp.phone,emp.aadhar_no,emp.image,emp.pin,emp.age], (err, rows, fields) => {
        if(!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send("Inserted : " + element[0].Cno);
            });
        else
        console.log(err);
    })
})

app.listen(3000);