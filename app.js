const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: true
}))

const routes = require('./routes.js')
app.use('/', routes)

app.listen(process.env.PORT || 3000)