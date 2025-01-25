const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())

const URL = require('./db')

app.listen(process.env.PORT, function () {
    console.log(`The server is running on port ${process.env.PORT}`)
})

// const connectDB = require("./config")
// connectDB()

mongoose.set("strictQuery", false);
mongoose.connect(URL)
    .then(console.log("mongoDb connected"))
    .catch(error => console.log("mongoDb error", error))

app.use('/', require('./routes/rootRoute'))
