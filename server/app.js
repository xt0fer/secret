const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const notesRoutes = require('./routes/notes')

mongoose.connect(process.env.MONGO_CONNECTION_STRING)

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use('/notes', notesRoutes)

app.listen(process.env.PORT || 8080)
