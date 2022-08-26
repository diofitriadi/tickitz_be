const express = require("express");
const app = express()
const moviesRoute = require('./moviesRoute')
const bookingRoute = require('./bookingRoute')
const scheduleRoute = require('./scheduleRoute')
const authRoute = require('./authRoute')
const usersRoute = require('./usersRoute')


app.use('/movies', moviesRoute)
app.use('/booking', bookingRoute)
app.use('/schedule', scheduleRoute)
app.use('/users', usersRoute)
app.use('/auth', authRoute)




module.exports = app




