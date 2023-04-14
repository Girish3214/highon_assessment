import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";

const userRegister = async (req, res) => {
  const { username, email, avatarImage } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    console.log("already exist...");
    res.send("expty..");
  } else {
    const user = await User.create({
      username,
      email,
      avatarImage,
    });
    return res.json(user);
  }
};

export { userRegister };
