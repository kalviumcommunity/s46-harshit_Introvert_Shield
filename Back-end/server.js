const routes = require("./routes")
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const app = express()

const mongoURI = process.env.mongoURI
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}) 

const database = mongoose.connection
database.on('error', console.error.bind(console, 'MongoDB connection error'))
database.once('open', () => {
    console.log("Connected to MongoDB using Mongoose")
})

app.use(cors())
app.use(express.json())
app.use("/",routes)

app.get('/status', (req, res) => {
    if(database.readyState === 1){
        res.send("Connected to MongoDB")
    }else{
        res.send("Couldn't connect to MongoDB")
    }
})
app.listen(3000, () => {
    console.log("Server is running")
})
