// controller = tempat dimana kita menghubungkan antara client dan database
const Movies = require('../model/Movies')

module.exports = {
    getAllMovies: async (req, res)=> {
        try {
            const results = await Movies.get(req, res)
            return res.status(200).send(results)
        } catch (error) {
            return res.status(500).send(error)
        }
    },getMoviesById: async (req, res)=> {
        try {
            const results = await Movies.getById(req, res)
            return res.status(200).send(results)
        } catch (error) {
            return res.status(500).send(error)
        }
    },
    addNewMovies: async (req, res)=> {
        try {
            const reqModifer = {
                ...req,
                body: { ...req.body, cover: req.file.filename }
            }
            const results = await Movies.add(reqModifer, res)
            return res.status(201).send(results)
        } catch (error) {
            return res.status(400).send(error)
        }
    },
    updateMovies: async (req, res) => {
        try {
            let reqModifier = {
                ...req,
            }
            if(req.file) { 
                reqModifier = {
                ...req,
                    body: { ...req.body, cover: req.file.filename },
                }
            }
            const results = await Movies.update(reqModifier, res)
            return res.status(201).send(results)
        } catch (error) {
            return res.status(400).send(error)
        }
    },
    deleteMovies: async(req, res)=> {
        try {
            const results = await Movies.remove(req, res)
            return res.status(201).send(results)
        } catch (error) {
            return res.status(400).send(error)
        }
    }
}