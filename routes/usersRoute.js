const express = require("express")
const {getAllUsers, addNewUsers, updateUsers, deleteUsers } = require('../controller/usersController')
const router = express.Router()

router.get('/', getAllUsers)
router.post('/', addNewUsers)
router.patch('/:id', updateUsers)
router.delete('/:id', deleteUsers)




module.exports = router