var express = require('express')
var cors = require('cors')
const connectToMongo = require('./db')
var app = express()
const PORT = 5000

connectToMongo();
app.use(cors())
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));
app.listen(PORT, () =>{
    console.log(`Server is runing at port ${PORT}`)
})
