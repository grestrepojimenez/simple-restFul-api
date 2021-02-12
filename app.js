const express = require('express')
const mongoose = require('mongoose')
const cors  = require('cors')
const bodyParser = require('body-parser')
require('dotenv/config')

const app = express()

app.use(cors())
app.use(bodyParser.json())

//Import Modules
// const postRoute = require('./routes/posts')
// const userRoute = require('./routes/user')

// app.use('/posts', postRoute)
// app.use('/user', userRoute)

//Routes
app.get('/', (req, res) => {
    res.send('We are  on Homepage')
})

//Connect MongoDB
// mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true}, () =>{
//     console.log('Connectect to DB')
// })

app.listen(3000)