// backend/index.js

const express    = require('express')
const mongoose   = require('mongoose')
const cors       = require('cors')
const serverless = require('serverless-http')
require('dotenv').config()

const app = express()

// Enable CORS (including OPTIONS/preflight)
app.use(cors({
  origin: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}))
app.options('*', cors())

app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use('/api/auth',     require('./routes/auth'))
app.use('/api/users',    require('./routes/user'))
app.use('/api/items',    require('./routes/items'))
app.use('/api/messages', require('./routes/message'))

// Cache the connection so we only connect once
let isConnected = false
async function connectDB() {
  if (isConnected) return
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser:    true,
    useUnifiedTopology: true
  })
  isConnected = true
}

// Wrap once, then on each invocation ensure DB is ready
const handler = serverless(app)
module.exports = async (req, res) => {
  await connectDB()
  return handler(req, res)
}
