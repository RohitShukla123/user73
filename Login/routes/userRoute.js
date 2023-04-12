const express = require("express")
const userController = require("../controllers/userController");
const bodyParser = require('body-parser');;

const user_route = express();


user_route.use(bodyParser.json());
user_route.post('/login', userController.userLogin);
//  user_route.post('/forgatPassword',userController.forgetpassword)

//update user route;



module.exports = user_route