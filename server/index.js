import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const databaseURL = "mongodb+srv://dbs_hack:AbC123456@cluster0.pfsb0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

try {
  await mongoose.connect(databaseURL) // This returns a promise
  console.log('MongoDB Connected')
} catch (err) {
  console.error('MongoDB Connection Failed. ', err.message)
  process.exit(1);
}

app.use(cors({
  origin: [process.env.ORIGIN],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true, // we need to enable cookies hence credentials need to be set to true
}));

app.use(cookieParser());
app.use(express.json());


app.get('/', (req, res) => res.send("API Running"))

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// setupSocket(server);