import connectDB from './db.js';
import dotenv from 'dotenv';
import express from 'express';
import authRoutes from './src/routes/auth.js';
import userRoutes from './src/routes/user.js';
import cookieParser from 'cookie-parser';


dotenv.config()

const app = express()
const port = 3001


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST ,PUT,DELETE,PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, x-access-token");
  res.header("Access-Control-Allow-Credentials", "true");


  next();
});

app.use(cookieParser())

app.use(express.json())

connectDB()

app.use("/auth",authRoutes)
app.use("/user",userRoutes)



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
