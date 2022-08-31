const express = require("express")
const { getAllLocation, getLocationById } = require('../controller/locationController')
const router = express.Router()



router.get('/', getAllLocation)
router.get('/:id', getLocationById)




module.exports = router