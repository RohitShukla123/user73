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
        // unique: true
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

    password: {
        type: String,
        require: true,
        validate: [
            {
                validator: function (password) {
                    console.log(password)
                    return password && password.toString().trim().length === 60;
                },
                message: 'password should be 8 digits'
            }
        ]
    },
    userId: {
        type: String,
        default: uuidv4().replace(/-/g, '').slice(0, 10)
    },
    


})


module.exports = mongoose.model("User", userSchema)