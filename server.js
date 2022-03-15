const mysql = require("mysql");
const bodyParser = require("body-parser");
const express = require("express");
const userRoutes = require("./routes/user");
const userdetailsRoutes = require("./routes/userdetails");
const transactionRoutes = require("./routes/transaction");
const contactRoutes = require("./routes/contact");

var app = express();
app.use(bodyParser.json());

app.use("/user", userRoutes);
app.use("/userdetails", userdetailsRoutes);
app.use("/transaction", transactionRoutes);
app.use("/contact", contactRoutes);

app.listen(3000);