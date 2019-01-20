if (!process.env.NODE_ENV) require('dotenv').config()

const express = require('express')
const passport = require('passport')
const bodyParser = require('body-parser')

const path = require('path')
const app = express()
const router = require('./router')

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '/public')))
app.use(passport.initialize())

router(app)

app.listen(process.env.PORT, () => {
    console.log(`server listening on ${process.env.PORT}`)
})
