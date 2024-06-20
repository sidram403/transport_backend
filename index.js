import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import tripsRouter from './routes/trips.route.js'
import driverRouter from './routes/driver.route.js'
import authRouter from './routes/auth.route.js'

dotenv.config()

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to DB')
}).catch((err) =>{
    console.log(err);
})

const app= express()

app.use(cors())

app.use(express.json());


app.use('/server/trips', tripsRouter)
app.use('/server/driver', driverRouter)
app.use('/server/auth', authRouter)
app.listen(3000, () =>{
    console.log('Server is running on port 3000!');
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });