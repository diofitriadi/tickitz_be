const express = require("express");
const app = express()
const moviesRoute = require('./moviesRoute')
const bookingRoute = require('./bookingRoute')
const scheduleRoute = require('./scheduleRoute')
const usersRoute = require('./usersRoute')

app.use('/movies', moviesRoute)
app.use('/booking', bookingRoute)
app.use('/schedule', scheduleRoute)
app.use('/users', usersRoute)



module.exports = app




