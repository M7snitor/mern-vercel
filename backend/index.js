// backend/index.js

const express      = require('express')
const mongoose     = require('mongoose')
const cors         = require('cors')
const serverless   = require('serverless-http')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use('/api/auth',     require('./routes/auth'))
app.use('/api/users',    require('./routes/user'))
app.use('/api/items',    require('./routes/items'))
app.use('/api/messages', require('./routes/message'))

let isConnected = false
async function connectDB() {
  if (isConnected) return
  await mongoose.connect(process.env.MONGO_URI)
  isConnected = true
}

// Export a single handler that ensures the DB is connected
module.exports = serverless(async (req, res) => {
  await connectDB()
  return app(req, res)
})
