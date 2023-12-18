import connectDB from './db.js';
import dotenv from 'dotenv';
import express from 'express';
import authRoutes from './src/routes/auth.js';
import userRoutes from './src/routes/user.js';


dotenv.config()

const app = express()
const port = 3001

connectDB()

app.use(express.json())



app.use("/auth",authRoutes)
app.use("/user",userRoutes)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
