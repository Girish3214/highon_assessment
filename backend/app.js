import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import "express-async-errors";

import connectDB from "./db/connect.js";
import notFound from "./middleware/not-found.js";
import errorHandler from "./middleware/error-handler.js";

import userRouter from "./routes/userRoute.js";
import messageRouter from "./routes/messageRoute.js";
const app = express();
dotenv.config();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/messages", messageRouter);

app.use(notFound);
app.use(errorHandler);

let server = "";
const start = async () => {
  try {
    await connectDB();
    const port = process.env.PORT || 5000;
    server = app.listen(port, () =>
      console.log(`Server started at port: ${port}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
