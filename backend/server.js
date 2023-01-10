const express = require('express')
require('dotenv').config()
const errorHandler = require('./middleware/errorMiddleware')
const app = express()
const color = require('colors')
const connectDB = require('./db/dBase')
const path = require('path')


// connect to database
connectDB()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
const PORT = process.env.PORT || 8000

const userRoutes = require('./routes/userRoutes')
const jobRoutes = require('./routes/jobRoutes')





// Routes
app.use('/api/users', userRoutes)
app.use('/api/jobs', jobRoutes)


// Serve Frontend
if (process.env.NODE_ENV === 'production') {
    // Set build folder as static
    app.use(express.static(path.join(__dirname, '../frontend/build')))
  
    // FIX: below code fixes app crashing on refresh in deployment
    app.get('*', (_, res) => {
      res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
    })
  } else {
    app.get('/', (_, res) => {
      res.status(200).json({ message: 'Welcome to the Job Feedback System' })
    })
  }


// error handler
app.use(errorHandler)


app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
