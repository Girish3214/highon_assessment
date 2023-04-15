import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";

const userRegister = async (req, res) => {
  const { username, email, avatarImage } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    res.json(user);
  } else {
    const user = await User.create({
      username,
      email,
      avatarImage,
    });
    return res.json(user);
  }
};

const getAllUsers = async (req, res) => {
  console.log(req.params.id);
  const allUsers = await User.find({ _id: { $ne: req.params.id } }).select([
    "_id",
    "username",
    "email",
    "avatarImage",
  ]);
  return res.json(allUsers);
};

export { userRegister, getAllUsers };
