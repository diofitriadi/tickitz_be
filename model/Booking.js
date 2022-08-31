// model = tempat dimana kita meletakkan data yang berhubungan dengan database
const db = require('../helper/db_connection')

module.exports = {
    get: (req, res)=> {
      return new Promise((resolve, reject)=> {
        const sql = `SELECT * FROM booking LEFT JOIN movies on booking.id_movies = movies.id_movies LEFT JOIN booking.id_cinema = cinema.id_cinema ORDER BY booking.created_at DESC` 
        db.query(sql,(err, results)=> {
          if(err) {
            reject({message: "ada error"})
          }
          resolve({
            message: "get all booking success",
            status: 200,
            data: results
          })
        })
      })
    },
    add: (req, res)=> {
      return new Promise((resolve, reject)=> {
        const {id_movies , id_cinema, date_playing, time, seat} = req.body
        db.query(`INSERT INTO booking(id_movies, id_cinema, date_playing, time, seat VALUES('${id_movies}', '${id_cinema}','${date_playing}','${time}','${seat}')`,
        (err, results)=> {
          if(err) {
            console.log(err)
            reject({message: "ada error"})
          }
          resolve({
            message: "add new booking success",
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
        db.query(`SELECT * FROM booking where id=${id}`,(err, results)=> {
          if(err) {res.send({message: "ada error"})}
      
          const previousData = {
            ...results[0],
            ...req.body
          }
          const {title, date_time, cinema, number_of_ticket, total_payment, payment_method} = previousData
      
          db.query(`UPDATE booking SET title='${title}', date_time='${date_time}', cinema='${cinema}', number_of_ticket='${number_of_ticket}', total_payment='${total_payment}', payment_method='${payment_method}' WHERE id=${id}`,(err, results)=> {
            if(err) {
              console.log(err)
              reject({message: "ada error"})
            }
            resolve({
              message: "update booking success",
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
        db.query(`DELETE FROM booking where id=${id}`,(err, results)=> {
          if(err) {reject({message: "ada error"})}
          resolve({
            message: "delete booking success",
            status: 200,
            data: results
          })
        })
      })
    }
}