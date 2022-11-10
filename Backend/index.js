const express = require("express");
const connectDB = require("./db/connection");
const userRoutes = require("./Routes/userRoutes");
const adminRoutes = require("./Routes/adminRoutes");
const {errorHandler,notFound} = require('./Middlewears/errorhandling')
const bodyparser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()




const PORT = 3001;

const app = express()
connectDB()
app.use(express.json())
app.use(bodyparser.json())
app.use(morgan('dev'))
app.use(cors())





app.use('/', userRoutes)

app.use('/admin', adminRoutes)


app.use(notFound)
app.use(errorHandler)




app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
