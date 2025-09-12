require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const { readdirSync } = require('fs')
const port = process.env.PORT
const app = express()


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))
app.use(cors({
    origin:process.env.ORIGIN,
    methods:['POST','PUT','DELETE','GET','OPTIONS'],
    allowedHeaders:['Content-Type','Authorization']
}))

app.get('/', (req, res) => {
  res.status(200).send('OK');
});

readdirSync('./src/routes').map((e)=>app.use('/api',require('./src/routes/' + e)))

app.listen(port,()=>console.log(`Server is running on port ${port} 🚀`))
