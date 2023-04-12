const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const saltRounds = 10;
const securePassword = async (password) => {
  try {
  
    console.log(password);
    const salt = await bcrypt.genSalt(saltRounds);
    console.log(salt);
    const hash = await bcrypt.hash(password, salt);
    console.log(hash, hash.length);

    return hash;
    


  
  } catch (error) {
    console.log(error.message);
  }
};

const addRegister = async (req, res) => {
  try {
    res.render("registration");
  } catch (error) {
    console.log(error.message);
  }
};
const createUser = async (req, res) => {
  try {

    if(req && req.body && req.body.password && req.body.password.length !== 8){
        res.send('Invalid password');
    }

    const spassword = await securePassword(req.body.password);
    console.log(spassword);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mno,
      uuid: req.body.uuid,
      image: req.file.filename,
      password: spassword,
      is_admin: 0,
    });
    console.log(user);
    const userData = await user.save();

    console.log(userData);

    if (userData) {
    
      res.render("registration", {
        message: "Your Registration has been successfully",
      });
    } else {
      res.render("registration", {
        message: "Your Registration has been failed",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};


module.exports = {
  addRegister,
  createUser,

};
