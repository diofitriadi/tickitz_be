const express = require("express")
const {getAllMovies, getMoviesById, addNewMovies, updateMovies, deleteMovies} = require('../controller/moviesController')
const router = express.Router()

router.get('/', getAllMovies)
router.get('/:id', getMoviesById )
router.post('/', addNewMovies)
router.patch('/:id', updateMovies)
router.delete('/:id', deleteMovies)




module.exports = router