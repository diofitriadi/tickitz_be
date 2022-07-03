require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const router = require('./routes')
const cors = require('cors')
//cara pertama kita input kita ada di json (di postman: body > Raw > Type = JSON)
app.use(bodyParser.json())
//www-url-form-encoded
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use('/api/v1', router)


app.listen(port, () => {
  console.log(`Tickitz Backend listening on port ${port}`)
})