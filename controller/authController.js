const Auth = require('../model/Auth')

module.exports = {
    login: async (req, res)=> {
        try {
            const results = await Auth.login(req, res)
            return res.status(200).send(results)
        } catch (error) {
            return res.status(500).send(error)
        }
    },
    register: async (req, res)=> {
        try {
            const reqModifer = {
                ...req,
                body: { ...req.body, image: req.file.filename }
            }
            const results = await Auth.register(reqModifer, res)
            return res.status(201).send(results)
        } catch (error) {
            return res.status(400).send(error)
        }
    }
}
