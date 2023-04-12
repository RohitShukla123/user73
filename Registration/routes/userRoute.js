const express = require("express")
const userController = require("../controllers/userController");
const bodyParser = require('body-parser');;
const multer = require('multer')
const path = require('path')

const user_route = express();

//file upload

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/userimages'))
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name)
    }

})
// 

const upload = multer({ storage: storage })

user_route.set('view engine', 'ejs');
user_route.set('views', './views/users');
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({ extended: true }))


user_route.get('/register', userController.addRegister)
user_route.post('/register', upload.single('image'), userController.createUser)
// user_route.get('/verify', userController.verifyMail)


module.exports = user_route