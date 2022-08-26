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
      const { id } = req.params
      const sql = `SELECT * FROM users WHERE id=${id}`
      return new Promise((resolve, reject) => {
          db.query(sql, (err, results) => {
              if (err) {
                  reject({
                      success: false,
                      status: 500,
                      message: `User not found`,
                  })
              } 
              if (results.length == 0) {
                  reject({
                      success: false,
                      status: 400,
                      message: 'Bad Request, data not found!',
                  })
              } else {
                  let prevData = {
                      ...results[0],
                      image: results[0].image,
                      ...req.body
                  }
                  if (req.body.image === '') {
                      prevData = {
                          ...prevData,
                          image: results[0].image
                      }
                  }
                  if (req.body.image !== '' && !req.body.image) {
                    if (results[0].image !== req.body.image) {
                      fs.unlink(`uploads/${results[0].image}`, (err) => {
                          if (err) {
                              reject({
                                  success: false,
                                  status: 500,
                                  message: err,
                              })
                          }
                      })
                      prevData = {
                          ...prevData,
                          image: req.file.filename
                      }
                    }
                  }
                  const { name, phone, email, image } = prevData
                  const SQL = `UPDATE users SET name='${name}', phone='${phone}', email='${email}', image='${image}' WHERE id=${id}`
                  db.query(SQL, (err, results) => {
                    if (err) {
                        reject({
                            success: false,
                            status: 500,
                            message: `Failed updating data`,
                        })
                    } else {
                        resolve({
                            success: true,
                            status: 200,
                            message: 'successfully update data',
                            data: results
                        })
                    }
                  })
              }
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