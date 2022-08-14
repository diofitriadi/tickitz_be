// model = tempat dimana kita meletakkan data yang berhubungan dengan database
const db = require('../helper/db_connection')
const fs = require('fs')

module.exports = {
    get: (req, res)=> {
      return new Promise((resolve, reject)=> {
        const {title = '', release_date = ''} = req.query
        const {limit = 5, page = 1} = req.query
        const offset = (page-1)*limit
        const sql = `SELECT * FROM movies ${title ? `WHERE title LIKE '%${title}%'`: title && release_date ? `WHERE title LIKE '%${title}%' AND release_date LIKE '${release_date}%'`:''} ORDER BY release_date DESC LIMIT ${limit} OFFSET ${offset}`;
        db.query(sql,(err, results)=> {
          if(err) {
            reject({message: "ada error"})
          } else {
            db.query(`SELECT id_movies from movies`, (err, result) => {
              if(err) {
                console.log(err)
                reject({
                  message: "Something wrong"
                })
              } else {
                let totalPage = Math.ceil(result.length/limit)
                if(page > totalPage) {
                  reject({
                    message: "Page not found!",
                    status: 404,
                    data: []
                  })
                }
                resolve({
                  message: "Get all from movies success",
                  status: 200,
                  totalRow: results.length,
                  totalPage: totalPage,
                  data: results
                });
              }
            })
          }
          
        })
      })
    },getById: (req, res)=> {
      return new Promise((resolve, reject)=> {
        const {id} = req.params
        const sql = `SELECT * FROM movies WHERE id_movies='${id}'`
        db.query(sql,(err, results)=> {
          if(err) {
            reject({message: "ada error"})
          }
          resolve({
            message: "get all movies by id success",
            status: 200,
            data: results
          })
        })
      })
    },
    add: (req, res)=> {
      return new Promise((resolve, reject)=> {
        const {cover, title, categories, release_date, director, duration, casts, synopsis} = req.body
        db.query(`INSERT INTO movies(cover, title, categories, release_date, director, duration, casts, synopsis) VALUES('${cover}', '${title}','${categories}','${release_date}','${director}','${duration}','${casts}', '${synopsis}')`, 
        (err, results)=> {
          if(err) {
            console.log(err)
            reject({message: "ada error"})
          }
          resolve({
            message: "add new movies success",
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
        db.query(`SELECT * FROM movies where id_movies='${id}'`,(err, results)=> {
          if(err) {res.send({message: "ada error"})}
      
          const previousData = {
            ...results[0],
            ...req.body
          }
          const {cover, title, categories, release_date, director, duration, casts, synopsis} = previousData
          const tempImg = results[0].cover
          if (req.body.cover) {
            fs.unlink(`uploads/${tempImg}`, function (err) {
              if (err) {
                console.log(err);
                reject({
                  message: "Something wrong",
                });
              }
            });
          }

          db.query(`UPDATE movies SET cover='${cover}', title='${title}', categories='${categories}', release_date='${release_date}', director='${director}', duration='${duration}', casts='${casts}', synopsis='${synopsis}' WHERE id_movies='${id}'`,(err, results)=> {
            if(err) {
              console.log(err)
              reject({message: "ada error"})
            }
            resolve({
              message: "update movies success",
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
        db.query(`DELETE FROM movies where id_movies='${id}'`,(err, results)=> {
          if(err) {reject({message: "ada error"})}
          resolve({
            message: "delete movies success",
            status: 200,
            data: results
          })
        })
      })
    }
}