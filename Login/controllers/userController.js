const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const config = require("../config/config.js");
const jwt = require("jsonwebtoken");

// const randomstring =require("randomstring");




//create  reset password;

const sendResetPasswordMail = async(name,email,token)=>{
  try{
       const transporter= nodemailer.createTransport({
         
          host :'smtp.gmail.com',
          port:587,
          secure:false,
          requireTLS:true,
          auth:{
            user:config.emailUser,
            pass:config.emailPassword
          }

        });

        const mailOptions = {
          from:config.emailUser,
          to:email,
          subject:'for reset password',
          html:'<p>hii  '+name+'  Please copy the link and <a href="http://127.0.0.1:4501/resetPassword?token='+token+'">reset your password</a>'
        };
        transporter.sendMail(mailOptions,function(error,info){
          if(error){
            console.log(error)
          }else{
          console.log("mail has been sent:-",info.response)
          }
        })
       
  }catch(error){
    res.status(400).send({success:false,msg:error.message})
  }
}

const saltRounds = 10;
const securePassword = async (password) => {
  try {
    // const passwordHash = await bcrypt.hash(password,8);
    console.log(password);
    const salt = await bcrypt.genSalt(saltRounds);
    console.log(salt);
    const hash = await bcrypt.hash(password, salt);
    console.log(hash, hash.length);

    return hash;
    


    // return passwordHash;
  } catch (error) {
    console.log(error.message);
  }
};

const createToken = async (id) => {
  try {
    console.log(config.secretJwt);
    const token = await jwt.sign({ _id: id }, config.secretJwt);
    console.log(token);
    return token;
  } catch (error) {
    console.error(error);
  }
};



const userLogin = async (req, res) => {
  try {
    const email =  req.body.userId;
    const mobile = req.body.userId;
    const userId = req.body.userId;
    let password = req.body.password;

    let userData;
    console.log(email, mobile);
   

    const users = await User.find({
      $or: [
        { email: email },
        { mobile: mobile },
        { userId: userId }
      ]
    });
    console.log(users);
    if (users && users.length) {
      userData = users[0];
    }
    // console.log(userData)
    if (userData) {
      console.log(password, userData.password);
      // password = await securePassword(password);
      console.log('p----->', password);
      const passwordMatch = await bcrypt.compare(password, String(userData.password).trim());
      console.log(passwordMatch);
      console.log("welcome");

      if (passwordMatch) {
        //  console.log(passwordMatch)

        //console.log("welcome")
        const tokenData = await createToken(userData._id);
        // console.log(tokenData)
        const userResult = {
          id: userData._id,
          userId: userData.userId,
          name: userData.name,
          email: userData.email,
          password: userData.password,
          image: userData.image,
          mobile: userData.mobile,
          token: tokenData,
        };

        await User.updateOne({ _id: userData._id }, { token: tokenData });
        // console.log(userResult);
        const response = {
          success: true,
          msg: "user details",
          data: userResult,
        };

        res.status(200).send(response);
      } else {
        res
          .status(400)
          .send({ succes: false, message: "login detail is incorrect " });
      }
    } else {
      res
        .status(400)
        .send({ success: false, msg: "login details are incorrect" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//forgetpassword

const forgatPassword = async(req,res)=>{

  try{
   const email=req.body.email;
   const userData= await User.findOne({email:email})
    if(userData){
        const randomString = randomstring.generate()
      const data =await  User.updateOne({email:email},{$set:{token:randomString}})
      sendResetPasswordMail(userData.name,userData.email,randomString)
     res.status(200).send({succes:true,msg:"please check your inbox of mail and reset you password"})


    }else{
            res.status(200).send({succes:true,msg:"email or not existe"})
    }
  }catch(error){
      res.status(400).send({succes:false,msg:error.message})
  }

}

module.exports = {
  userLogin,
  //  forgatPassword
  
};
