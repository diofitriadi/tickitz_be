const express = require("express")
const {getAllMovies, getMoviesById, addNewMovies, updateMovies, deleteMovies} = require('../controller/moviesController')
const router = express.Router()
const upload = require('../helper/multer')
const verifyAuth = require("../helper/verifyAuth")

router.get('/', getAllMovies)
router.get('/:id', getMoviesById)
router.post('/', verifyAuth, upload, addNewMovies)
router.patch('/:id', verifyAuth, upload, updateMovies)
router.delete('/:id', verifyAuth, deleteMovies)




module.exports = router