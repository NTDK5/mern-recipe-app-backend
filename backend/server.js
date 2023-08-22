const express = require('express')
const path = require('path')
const colors = require('colors')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const {errorHandler} = require('./middleware/errorMiddleware')
const cors = require('cors');

connectDB()
const port = process.env.PORT || 5000
const app = express()

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(errorHandler)


app.use('/api/recipes', require('./routes/recipeRoutes'))
app.use('/api/users', require('./routes/userRoutes'))


app.listen(port, ()=>console.log(`server started on port ${port}`))
