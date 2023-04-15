import { StatusCodes } from "http-status-codes";
import Message from "../models/messageModel.js";

const addMessage = async (req, res) => {
  const { from, to, message } = req.body;
  const data = Message.create({
    message: {
      text: message,
    },
    users: [from, to],
    sender: from,
  });
  if (data) {
    res.status(StatusCodes.OK).json({ msg: "Message added successfully." });
  }
  res.status(StatusCodes.BAD_REQUEST).json({ msg: "Failed to added message." });
};
const getMessages = async (req, res) => {
  const { from, to } = req.body;

  const messages = await Message.find({
    users: {
      $all: [from, to],
    },
  }).sort({ updatedAt: 1 });

  const projectedMsgs = messages.map((msg) => {
    return {
      fromSelf: msg.sender.toString() === from,
      message: msg.message.text,
    };
  });

  res.status(StatusCodes.OK).json(projectedMsgs);
};

export { addMessage, getMessages };
