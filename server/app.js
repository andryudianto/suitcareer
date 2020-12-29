const express = require('express')
const app = express()
const PORT = 3000
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
const routes = require('./routes')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.use(routes)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log('listening on '+PORT)
})