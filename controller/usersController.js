// controller = tempat dimana kita menghubungkan antara client dan database
const Users = require("../model/Users");

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const results = await Users.getUser(req, res);
      res.status(200).send(results);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  getUsersById: async (req, res) => {
    try {
      const results = await Users.getById(req, res);
      res.status(200).send(results);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  updateUser: async (req, res) => {
    try {
      let reqModified = {
        ...req,
      };
      if (req.file) {
        if (req.file !== null && req.file !== "") {
          reqModified = {
            ...req,
            body: { ...req.body, image: req.file.filename },
          };
        }
      }
      const results = await Users.updateByUser(reqModified, res);
      return res.status(200).send(results);
    } 
    catch (error) {
      if (error.code === 400) {
        return res.status(400).send(error);
      }
      return res.status(500).send(error);
    }
  },
  deleteUsers: async (req, res) => {
    try {
      const results = await Users.removeUserByAdmin(req, res);
      res.status(201).send(results);
    } catch (error) {
      res.status(400).send(error);
    }
  },
};
