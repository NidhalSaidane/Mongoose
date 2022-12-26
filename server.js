const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port=8080
mongoose.connect("mongodb+srv://Nidhal:A123456789@cluster0.jjyx9ui.mongodb.net/?retryWrites=true&w=majority",()=>console.log("database is connected"));

app.use(express.json())
app.use("/person", require("./routes/userRoutes"));

app.listen(port,()=>console.log("listening in port 5000"))