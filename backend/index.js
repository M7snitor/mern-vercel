// backend/index.js

const express    = require('express')
const mongoose   = require('mongoose')
const cors       = require('cors')
require('dotenv').config()
const serverless = require('serverless-http')

const app = express()

// CORS must be enabled _before_ any routes, and cover OPTIONS:
app.use(
  cors({
    origin: true, // allow all origins; tighten this in prod if you like
    methods: ['GET','POST','PUT','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type','Authorization'],
    credentials: true
  })
)
// ensure preflight requests are handled
app.options('*', cors())

app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use('/api/auth',     require('./routes/auth'))
app.use('/api/users',    require('./routes/user'))
app.use('/api/items',    require('./routes/items'))
app.use('/api/messages', require('./routes/message'))

// MongoDB connection caching
let isConnected = false
async function connectDB() {
  if (isConnected) return
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser:    true,
    useUnifiedTopology: true
  })
  isConnected = true
}

// create the serverless handler _once_
const handler = serverless(app)

// Export the lambda entry‐point: connect DB, then delegate to Express
module.exports = async (req, res) => {
  await connectDB()
  return handler(req, res)
}
