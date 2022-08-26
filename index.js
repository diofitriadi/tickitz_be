require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const router = require('./routes')
const cors = require('cors')
const path = require('path')
const paginate = require('express-paginate')
const port = process.env.PORT || 3000
app.use(cors())
//cara pertama kita input kita ada di json (di postman: body > Raw > Type = JSON)
app.use(bodyParser.json())
//www-url-form-encoded
app.use(bodyParser.urlencoded({ extended: true }))



app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/api/v1', router)


app.get("/", (req, res) => res.send("service is running"))
app.listen(port, () => {
  console.log(`Tickitz Backend listening on port ${port}`)
})