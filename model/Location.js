const db = require('../helper/db_connection')


module.exports = {
  get: (req, res) => {
    return new Promise ((resolve, reject) => {
      const sql = `SELECT * FROM location`
      db.query(sql, (err, results) => {
        if(err) {
          reject({message: 'get all location failed'})
        } else {
          resolve({
            status: 200,
            message: 'get all location success',
            data: results
          })
        }
      })
    })
  },
  getById: (req, res) => {
    return new Promise ((resolve, reject) => {
      const {id} = req.params
      const sql = `SELECT * FROM location WHERE id_location=${id}`
      db.query(sql, (err, results) => {
        if(err) {
          reject({message: 'get location by id failed'})
        } else {
          resolve({
            status: 200,
            message: 'get location by id success',
            data: results
          })
        }
      }) 
    })
  }
}