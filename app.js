const http = require('http');
const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
const mainRouter = require('./router/main')
const bodyParser = require('body-parser');

const app = express()
const server = http.createServer(app)

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/documents',mainRouter)

app.get('/',(req,res)=>{
  res.json('Welcome')
})

app.use((err, req, res) => {
  res.status(err.status || 500).json({
    message: err.message || 'Unknown error', status: err.status || 500
  })
})
server.listen(5000, async () => {
  console.log(`Port ${5000} listen`)
})




