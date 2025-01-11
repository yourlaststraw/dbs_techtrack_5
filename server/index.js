import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./api/auth.js"
import getBalancesRouter from "./api/getBalances.js"

dotenv.config();


const app = express();
const port = process.env.PORT || 8747;
const databaseURL = process.env.DATABASE_URL;


try {
  await mongoose.connect(databaseURL)
  console.log('MongoDB Connected')
} catch (err) {
  console.error('MongoDB Connection Failed. ', err.message)
  process.exit(1);
}

app.use(cors());

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRouter)
app.use('/api/balances', getBalancesRouter)

app.get('/', (req, res) => res.send("API Running"))

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// setupSocket(server);
