// model = tempat dimana kita meletakkan data yang berhubungan dengan database
const db = require('../helper/db_connection')

module.exports = {
    get: (req, res)=> {
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
    add: (req, res)=> {
      return new Promise((resolve, reject)=> {
        const {firstName, last_name, full_name, email, phone_number} = req.body

        db.query(`INSERT INTO users(firstName, last_name, full_name, email, phone_number) VALUES('${firstName}', '${last_name}','${full_name}','${email}','${phone_number}')`,
        (err, results)=> {
          if(err) {
            console.log(err)
            reject({message: "ada error"})
          }
          resolve({
            message: "add new users success",
            status: 200,
            data: {
              id: results.insertId,
              ...req.body,
            }
          })
        })
      })
    },
    update: (req, res) => {
      return new Promise((resolve, reject)=> {
        const {id} = req.params
        db.query(`SELECT * FROM users where id=${id}`,(err, results)=> {
          if(err) {res.send({message: "ada error"})}
      
          const previousData = {
            ...results[0],
            ...req.body
          }
          const {firstName, last_name, full_name, email, phone_number} = previousData
      
          db.query(`UPDATE users SET firstName='${firstName}', last_name='${last_name}', full_name='${full_name}', email='${email}', phone_number='${phone_number}', WHERE id=${id}`,(err, results)=> {
            if(err) {
              console.log(err)
              reject({message: "ada error"})
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
    remove:(req, res)=> {
      return new Promise((resolve, reject)=> {
        const {id} = req.params
        db.query(`DELETE FROM users where id=${id}`,(err, results)=> {
          if(err) {reject({message: "ada error"})}
          resolve({
            message: "delete users success",
            status: 200,
            data: results
          })
        })
      })
    }
}