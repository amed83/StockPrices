const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// const routes = require('./routes')

const port = process.envPORT || 8081
mongoose.Promise = global.Promise;
// insert mongo db connection here

const app= express()
app.use(bodyParser.json())


app.use((err,req,res,next)=>{
    res.status(422).send({error:err.message})
    next()
})

app.listen(port,()=> console.log(`Server listening on ${port}`))