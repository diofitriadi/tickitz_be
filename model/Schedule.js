// model = tempat dimana kita meletakkan data yang berhubungan dengan database
const db = require('../helper/db_connection')

module.exports = {
    get: (req, res)=> {
      return new Promise((resolve, reject)=> {
        const sql = `SELECT * FROM schedule LEFT JOIN movies on schedule.id_movies = movies.id_movies LEFT JOIN cinema on schedule.id_cinema = cinema.id_cinema LEFT JOIN location on schedule.id_location = location.id_location ORDER BY schedule.created_at DESC`;
        db.query(sql,(err, results)=> {
          if(err) {
            reject({message: "ada error"})
          }
          resolve({
            message: "get all schedule success",
            status: 200,
            data: results
          })
        })
      })
    },
    add: (req, res)=> {
      return new Promise((resolve, reject)=> {
        const {id_movies , id_cinema, id_location, date_start, date_end, time} = req.body
        const sql = `INSERT INTO schedule (id_movies, id_cinema, id_location, date_start, date_end, time) VALUES ('${id_movies}', '${id_cinema}', '${id_location}', '${date_start}', '${date_end}', '${time}')`

        db.query(sql, (err, results)=> {
          if(err) {
            console.log(err)
            reject({message: "ada error"})
          }
          resolve({
            message: "add new schedule success",
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
        db.query(`SELECT * FROM schedule where id_schedule=${id}`,(err, results)=> {
          if(err) {res.send({message: "ada error"})}
      
          const previousData = {
            ...results[0],
            ...req.body
          }

          const {id_movies , id_cinema, id_location, date_start, date_end, time} = previousData

          db.query(`UPDATE schedule SET id_movies='${id_movies}', id_cinema='${id_cinema}', id_location='${id_location}', date_start='${date_start}', date_end='${date_end}', time='${time}' WHERE id_schedule=${id}`,(err, results)=> {
            if(err) {
              console.log(err)
              reject({message: "ada error"})
            }
            resolve({
              message: "update shedule success",
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
        db.query(`DELETE FROM schedule where id_schedule=${id}`,(err, results)=> {
          if(err) {reject({message: "ada error"})}
          resolve({
            message: "delete schedule success",
            status: 200,
            data: results
          })
        })
      })
    }
}