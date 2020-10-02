const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')
const app = express()
const port = 5500

const data = require('./Storage/router')

// body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// static files
app.use(express.static(path.join(__dirname, '../public')))
app.use('/api', data)

app.listen(port, () => console.log(`App listening on port ${port}!`))
