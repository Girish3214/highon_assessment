import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import "express-async-errors";

import connectDB from "./db/connect.js";
import notFound from "./middleware/not-found.js";
import errorHandler from "./middleware/error-handler.js";

const app = express();
dotenv.config();

app.use(morgan("tiny"));
app.use(cors);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Received");
});

app.use(notFound);
app.use(errorHandler);
const start = async () => {
  try {
    await connectDB();
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Server started at port: ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
