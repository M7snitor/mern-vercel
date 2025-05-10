const express  = require('express')
const mongoose = require('mongoose')
const cors     = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.options('*', cors())
app.use(express.json())

app.use('/api/auth',     require('./routes/auth'))
app.use('/api/users',    require('./routes/user'))
app.use('/api/items',    require('./routes/items'))
app.use('/api/messages', require('./routes/message'))

let isConnected = false
async function connectDB() {
  if (isConnected) return
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser:    true,
    useUnifiedTopology: true
  })
  isConnected = true
}

module.exports = async (req, res) => {
  await connectDB()
  return app(req, res)
}
