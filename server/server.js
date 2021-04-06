const express = require('express')

const PORT = 3000
const app = express()

const fileServerMiddleware = express.static('public')
app.use('/', fileServerMiddleware)

app.listen(PORT, function () {
    console.log('App started on port 3000')
})