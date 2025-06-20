import express from "express";
import cors from "cors";
import morgan from "morgan";
import { router } from "./router/route.js";
import { connect } from "./database/conn.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.disable("x-powered-by");

const PORT = 5000;

app.use("/api", router);

connect()
  .then(() => {
    try {
      app.listen(PORT, () => {
        console.log(`app is listening to port ${PORT}`);
      });
    } catch (error) {
      console.log("Cannot Connect to the server");
    }
  })
  .catch((error) => {
    console.log("Invalid Database connection...!", error);
  });

// http://localhost:5000
