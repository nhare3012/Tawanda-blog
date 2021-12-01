const PORT = process.env.PORT || 5000
const express = require('express')
const mongoose = require('mongoose')
const app = express()


app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));



app.listen(PORT)