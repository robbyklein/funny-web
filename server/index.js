// Env variables
if (!process.env.NODE_ENV) require('dotenv').config()

// Dependencies
const express = require('express')
const passport = require('passport')
const bodyParser = require('body-parser')
const path = require('path')

// Create Server
const app = express()

// Routing
const router = require('./router')

// Settings
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

// Middleware
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '/public')))
app.use(passport.initialize())

router(app)

app.listen(process.env.PORT, () => {
    (`server listening on ${process.env.PORT}`)
})
