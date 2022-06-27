const express = require("express")
const {getAllSchedule, addNewSchedule, updateSchedule, deleteSchedule } = require('../controller/ScheduleController')
const router = express.Router()

router.get('/', getAllSchedule)
router.post('/', addNewSchedule)
router.patch('/:id', updateSchedule)
router.delete('/:id', deleteSchedule)




module.exports = router