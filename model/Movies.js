// model = tempat dimana kita meletakkan data yang berhubungan dengan database
const db = require('../helper/db_connection')
const fs = require('fs')

module.exports = {
    get: (req, res)=> {
      return new Promise((resolve, reject)=> {
        const {title ='', release_date ='', categories ='' , order='title'} = req.query
        const {limit, page, sortBy = 'DESC'} = req.query
        const offset = (page-1) * limit
        const sql = `SELECT * FROM movies WHERE title LIKE '%${title}%' AND release_date LIKE '%${release_date}%' AND categories LIKE '%${categories}%' ORDER BY ${order} ${sortBy} ${page && limit ? `LIMIT ${limit} OFFSET ${offset}`:''}`
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
            message: "get movies by id success",
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
            release_date: results[0].release_date.toISOString().split('T')[0],
            ...req.body
          }
          const {cover, title, categories, release_date, director, duration, casts, synopsis} = previousData
          const tempImg = results[0].cover
          if (req.file === '') {
            prevData = {
                ...prevData,
                cover: results[0].cover
            }
          }                 
          if (req.file) {
              fs.unlink(`./uploads/${tempImg}`, (err) => {
                console.log(err)
              })
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
        db.query(`SELECT id_movies, cover FROM movies WHERE id_movies='${id}'`,(err, results)=> {
          if(err) {
            reject({message: "ada error"})
          } else if(results.length === 0) {
            reject({
              success: false,
              status: 400,
              message: "delete error, data not found"
            })
          } else {
            const tempImg = results[0].cover
            db.query(`DELETE FROM movies WHERE id_movies=${id}`,(err, results) => {
              console.log("haloo")
              if(err) {
                reject({
                  success: false,
                  status: 500,
                  message: 'error'
                })
              } else {
                fs.unlink(`./uploads/${tempImg}`, (err) => {
                  if (err) {
                      reject({
                          success: false,
                          status: 500,
                          message: 'error',
                      })
                  }
                })
                resolve({
                  success: true,
                  message: "delete movies success",
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