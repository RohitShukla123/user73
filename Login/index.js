const express = require("express");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/details")

const app = express();
const port = 4501


// user route 
const userRoute = require('./routes/userRoute');


app.use('/', userRoute)



app.listen(port, function () {

    console.log("Login server is running")

})
