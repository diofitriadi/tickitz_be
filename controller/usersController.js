// controller = tempat dimana kita menghubungkan antara client dan database
const Users = require('../model/Users')

module.exports = {
    getAllUsers: async (req, res)=> {
        try {
            const results = await Users.get(req, res)
            res.status(200).send(results)
        } catch (error) {
            res.status(500).send(error)
        }
    },
    deleteUsers: async(req, res)=> {
        try {
            const results = await Users.remove(req, res)
            res.status(201).send(results)
        } catch (error) {
            res.status(400).send(error)
        }
    }
}