// model = tempat dimana kita meletakkan data yang berhubungan dengan database
const db = require('../helper/db_connection')

module.exports = {
    getUser: (req, res)=> {
      return new Promise((resolve, reject)=> {
        const sql = 'SELECT * FROM `users`'
        db.query(sql,(err, results)=> {
          if(err) {
            reject({message: "ada error"})
          }
          resolve({
            message: "get all users success",
            status: 200,
            data: results
          })
        })
      })
    },
    getById:(req, res) => {
        return new Promise((resolve, reject)=> {
          const {id} = req.params
          const sql = `SELECT * FROM users WHERE id='${id}'`
          db.query(sql,(err, results)=> {
            if(err) {
              reject({message: "ada error"})
            } 
            if (results.legth === 0) {
              reject({
                message: "Bad request, Data not found"
              }) 
            } else {
              resolve({
              message: "get user by id success",
              status: 200,
              data: results
              })
            }
          })
        })
    },
    updateByUser:(req, res) => {
      return new Promise((resolve, reject) => {
        const { id } = req.params
        const sql = `SELECT * FROM users WHERE id=${id}`
          db.query(sql, (err, results) => {
            if (err) {
              res.send({
                message: "user not found"
              })} 

            const previousData = {
              ...results[0],
              ...req.body
            }
            
            const { name, email, password, image, phone_number } = previousData

            const tempImg = results[0].image
            if(req.file = '') {
              prevData = {
                ...prevData,
                image: results[0].image
              }
            }
            if (req.file) {
              fs.unlink(`./uploads/${tempImg}`, (err) => {
                console.log(err)
              })
            }
            db.query(`UPDATE users SET name='${name}', email='${email}', image='${image}', phone_number='${phone_number}' WHERE id='${id}'`, (err, results) => {
              if(err) {
                console.log(err)
                reject({message: "error has been found"})
              }
              resolve({
                  message: "update users success",
                  status: 200,
                  data: results
              })
            })
          })
      })
    },
  removeUserByAdmin:(req, res)=> {
    return new Promise((resolve, reject)=> {
      const {id} = req.params
      const sql = `DELETE FROM users where id=${id}`
      db.query(sql,(err, results)=> {
        if(err) {
          reject({
            message: "there's an error"
          })
        } else if(results.length === 0) {
          reject({
            message: "Bad Request, data not found"
          })
        } else {
          const tempImg = results[0].image
          const SQL = `DELETE FROM users WHERE id=${id}`
          db.query(SQL,(err, results) => {
            if(err) {
              reject({
                  success: false,
                  status: 500,
                  message: `Error`,
              })
            } else {
              fs.unlink(`uploads/${tempImg}`, (err) => {
                if (err) {
                    reject({
                        success: false,
                        status: 500,
                        message: err,
                    })
                }
              })
              resolve({
                message: "delete users success",
                status: 200,
                data: results
              })
            }
          })
        }
      })
    })
  }
}