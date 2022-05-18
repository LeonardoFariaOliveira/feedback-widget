import express from 'express'
import cors from 'cors'
import routes from './routes'


const app = express()

app.use(express.static('src/public'))

const bodyParser = require('body-parser')

app.use(bodyParser.json()) // for parsing application/json

app.use(cors())

app.use(routes)

const port = process.env.PORT || 3333

app.listen(port, () => {
  console.log('Server is running on port: ' + port)
})