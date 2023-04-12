const express = require("express");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/details")

const app = express();
const port = 4500


// user route 
const userRoute = require('./routes/userRoute');


app.use('/', userRoute)

app.listen(port, function () {

    console.log("Registration server is running")

})