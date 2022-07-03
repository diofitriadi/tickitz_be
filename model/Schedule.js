// model = tempat dimana kita meletakkan data yang berhubungan dengan database
const db = require('../helper/db_connection')

module.exports = {
    get: (req, res)=> {
      return new Promise((resolve, reject)=> {
        const sql = `SELECT * FROM schedule left join movies on schedule.id = movies.id_movies`;
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
        const {id_movies ,date, place, cinema, adress, logo, showtime} = req.body

        db.query(`INSERT INTO schedule(id_movies, date, place, cinema, adress, logo, showtime) VALUES('${id_movies}','${date}', '${place}','${cinema}','${adress}','${logo}','${showtime}')`,
        (err, results)=> {
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
        db.query(`SELECT * FROM schedule where id=${id}`,(err, results)=> {
          if(err) {res.send({message: "ada error"})}
      
          const previousData = {
            ...results[0],
            ...req.body
          }
          const {id_movies,date, place, cinema, adress, logo, showtime} = previousData
      
          db.query(`UPDATE schedule SET id_movies= '${id_movies}', date='${date}', place='${place}', cinema='${cinema}', adress='${adress}', logo='${logo}', showtime='${showtime}' WHERE id=${id}`,(err, results)=> {
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
        db.query(`DELETE FROM schedule where id=${id}`,(err, results)=> {
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