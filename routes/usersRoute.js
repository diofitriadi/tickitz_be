const express = require("express")
const router = express.Router()
const upload = require('../helper/multer')
const {verifyAdmin, verifyUser} = require("../helper/verifyAuth")
const {getAllUsers, deleteUsers, updateUser, getUsersById } = require('../controller/usersController')


router.get('/', verifyAdmin, getAllUsers)
router.get('/:id', verifyAdmin, getUsersById)
router.patch('/update', verifyUser, upload, updateUser)
router.delete('/:id', verifyAdmin, deleteUsers)




module.exports = router