const express = require('express')
const cors = require("cors")
const app = express()
const port = 5000
const mongoDB=require("./db")
mongoDB();
app.use((req,res,next)=>{
  res.setHeader("Access-control-Allow-Origin","http://localhost:3000")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  )
  next()
})
app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json())
app.use('/api/auth',require('./Routes/CreateUser'))
app.use('/api',require('./Routes/DisplayData.js'))
app.use('/api/user',require('./Routes/OrderData.js'))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})