import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bodyparser from 'body-parser'

import userRoute from './routes/userRoutes.js'
import adminRoute from './routes/adminRoutes.js'

dotenv.config()

const app = express()

mongoose.connect(process.env.database)
mongoose.connection.on('connected',()=>{
    console.log('database connected');
})

app.use(express.json())
app.use(bodyparser.urlencoded({extended:true}))

const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`server is running sucessfully in port ${port}`);
})


app.use('/', userRoute)
app.use('/admin', adminRoute)