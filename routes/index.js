const express = require("express");
const app = express()
const moviesRoute = require('./moviesRoute')
const bookingRoute = require('./bookingRoute')
const scheduleRoute = require('./scheduleRoute')
const authRoute = require('./authRoute')
const usersRoute = require('./usersRoute')
const locationRoute = require('./locationRoute')


app.use('/movies', moviesRoute)
app.use('/booking', bookingRoute)
app.use('/schedule', scheduleRoute)
app.use('/users', usersRoute)
app.use('/auth', authRoute)
app.use('/location', locationRoute)




module.exports = app




