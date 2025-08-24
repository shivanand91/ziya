import express from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import connectDB from "./config/db.js"
import userRouter from './routes/user.route.js';

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/api/auth', userRouter)


app.listen(port, () => {
    connectDB()
    console.log(`Server is running on http://localhost:${port}`);
})