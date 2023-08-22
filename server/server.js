const express = require('express')
const cors = require('cors')
const logger = require('morgan')

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger('dev'))

app.get('/', (req, res) => res.send("Hello, world!"))
app.use('/colours', require('./routes/colours'))

module.exports = app
