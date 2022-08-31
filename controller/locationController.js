const Location = require('../model/Location')


module.exports = {
  getAllLocation: async (req, res) => {
    try {
      const results = await Location.get(req, res)
      return res.status(200).send(results)
    } 
    catch (error) {
      return res.status(500).send(error)
    }
  },
  getLocationById: async (req, res) => {
    try {
      const results = await Location.getById(req, res)
      return res.status(200).send(results)
    }
    catch (error) {
      return res.status(500).send(results)
    }
  }
}