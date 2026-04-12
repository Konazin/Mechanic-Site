const express = require('express')
require('dotenv').config()
const helmet = require('helmet')

const routes = require('./routes')

const app = express()

app.use(helmet())
app.use(express.json())
app.use('/api', routes)

app.use(require('./middlewares/errorMiddleware'))

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})