import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";


dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const databaseURL = process.env.DATABASE_URL;

app.use(cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true, // we need to enable cookies hence credentials need to be set to true
}));

app.use(cookieParser());
app.use(express.json());


const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

mongoose.connect(databaseURL)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
  });