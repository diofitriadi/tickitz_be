const express = require("express")
const {login, register} = require('../controller/authController')
const userUploads = require('../helper/userMulter')
const router = express.Router()

router.post('/login', login)
router.post('/register', userUploads, register)




module.exports = router