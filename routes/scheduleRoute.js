const express = require("express")
const {getAllSchedule, addNewSchedule, updateSchedule, deleteSchedule } = require('../controller/scheduleController')
const router = express.Router()

router.get('/', getAllSchedule)
router.post('/', addNewSchedule)
router.patch('/:id', updateSchedule)
router.delete('/:id', deleteSchedule)




module.exports = router