const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },


    email: {
        type: String,
        require: true,
    
    },
    mobile: {
        type: String,
        required: true,
        validate: [
            {
                validator: function (mobile) {
                    return mobile && mobile.toString().trim().length === 10;
                },
                message: 'mobile should be 10 digits'
            }
        ]
    },
    image: {
        type: String,
        require: true
    },

    //     type: String,
    //     required: true,
    //     // minlength: 7,
    //     // maxlength: 10,
    //     validate: {
    //         validator: function (v) {
    //             // Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character
    //             return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(v);
    //         },
    //         message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    //     }
    // },
    password: {
        type: String,
        required: true,
        validate: [
            {
                validator: function (password) {
                    return password && password.toString().trim().length === 8;
                },
                message: 'password should be 8 digits'
            }
        ]
    },
    
    userId: {
        type: String,
        default: uuidv4().replace(/-/g, '').slice(0, 10)
    },
  token:{
    type:String,
    default:''
  },
  
  

})


module.exports = mongoose.model("User", userSchema)