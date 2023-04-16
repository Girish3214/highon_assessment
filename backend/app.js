import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import "express-async-errors";
import { Server } from "socket.io";

import connectDB from "./db/connect.js";
import notFound from "./middleware/not-found.js";
import errorHandler from "./middleware/error-handler.js";

import userRouter from "./routes/userRoute.js";
import messageRouter from "./routes/messageRoute.js";
const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/messages", messageRouter);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB();
    const port = process.env.PORT || 5000;
    const server = app.listen(port, () =>
      console.log(`Server started at port: ${port}`)
    );
    const io = new Server(server, {
      pingTimeOut: 60000,
      cors: { origin: "http://localhost:5173" },
    });

    io.on("connection", (socket) => {
      console.log("connected to socket.io");

      socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
      });

      socket.on("join-chat", (room) => {
        socket.join(room);
        console.log("user joined chat", room);
      });

      socket.on("new-message", (newMsg) => {
        var chat = newMsg;
        // socket.broadcast.to(chat.users[1]).emit("new-message", chat);
        if (!chat.users) return console.log("chat.users not defined");
        chat.users.forEach((user) => {
          console.log(user, ":");
          if (user === newMsg.sender) return;
          console.log(newMsg);

          socket.in(user).emit("message-received", newMsg);
        });
      });

      socket.on("typing", (room) => socket.in(room).emit("typing"));
      socket.on("stop-typing", (room) => socket.in(room).emit("stop-typing"));

      socket.off("setup", (userData) => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
      });
    });
  } catch (error) {
    console.log("error", error);
  }
};

start();
