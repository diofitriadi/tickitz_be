const express = require("express")
const {getAllUsers, addNewUsers, updateUsers, deleteUsers } = require('../controller/usersController')
const router = express.Router()
const verifyAuth = require("../helper/verifyAuth")

router.get('/', verifyAuth, getAllUsers)
router.delete('/:id', verifyAuth, deleteUsers)




module.exports = router