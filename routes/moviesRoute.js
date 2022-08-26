const express = require("express")
const { getAllMovies, getMoviesById, addNewMovies, updateMovies, deleteMovies } = require('../controller/moviesController')
const router = express.Router()
const upload = require('../helper/multer')
const { verifyAdmin } = require("../helper/verifyAuth")

//only admin can perform crud
router.get('/', getAllMovies)
router.get('/:id', getMoviesById)
router.post('/', verifyAdmin, upload, addNewMovies)
router.patch('/:id', verifyAdmin, upload, updateMovies)
router.delete('/:id', verifyAdmin, deleteMovies)




module.exports = router