const db = require("../helper/db_connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  login: (req, res) => {
    const { email, password } = req.body;
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT id, name, email, password, image, phone_number, role FROM users WHERE email='${email.toLowerCase()}'`,
        (err, results) => {
          if (err) {
            reject({ message: "Wrong Email or Password" }); //bcrypt nya error
          } else {
            bcrypt.compare(
              password,
              results[0].password,
              function (errHash, succHash) {
                if (errHash) {
                  reject({
                    message: "Ada Masalah Saat Login, Silahkan Coba Lagi",
                  });
                }
                if (succHash) {
                  const token = jwt.sign(
                    { user_id: results[0].id, role: results[0].role },
                    process.env.JWT_SECRET_KEY,
                    {
                      expiresIn: "1day",
                    }
                  );
                  resolve({
                    message: "login success",
                    status: 200,
                    token,
                    user_id: results[0].id,
                    name: results[0].name,
                    phone_number: results[0].phone_number,
                    role: results[0].role,
                    email: results[0].email,
                    image: results[0].image
                  });
                } else {
                  reject({ message: "Email atau Password salah" });
                }
              }
            );
          }
        }
      );
    });
  },
  register: (req, res) => {
    const { name, email, password, image, phone_number } = req.body;
    return new Promise((resolve, reject) => {
      if (req.body.role) {
        resolve({ message: "you are not permitted" });
      }
      bcrypt.hash(password, 10, function (err, hashedPassword) {
        if (err) {
          reject({ message: "ada error" });
        } else {
          db.query(
            `INSERT INTO users(name, email, password, image, phone_number) VALUES('${name}', '${email}', '${hashedPassword}', '${image}', '${phone_number}')`,
            (err, results) => {
              if (err) {
                reject({ message: err.code });
              }
              resolve({
                message: "register success",
                status: 200,
                data: results,
              });
            }
          );
        }
      });
    });
  },
};
