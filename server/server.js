import express from "express";
import cors from "cors";
import morgan from "morgan";
// import {  } from "mongoose";
import { connect } from "./database/conn.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.disable("x-powered-by");

const PORT = 5000;

app.get("/", (req, res) => {
  res.status(201).json("Home GET Request");
});

connect()
  .then(() => {
    try {
      app.listen(PORT, () => {
        console.log(`app is listening to port ${PORT}`);
      });
    } catch (err) {
      console.log("Cannot Connect to the server");
    }
  })
  .catch((err) => {
    console.log("Invalid Database connection...!", err);
  });

// http://localhost:5000
