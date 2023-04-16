import { StatusCodes } from "http-status-codes";
import UserProfiles from "../models/userChatProfilesModel.js";

const addNewProfileToUser = async (req, res) => {
  const { senderId, newProfileId } = req.body;

  const user = await UserProfiles.findById({ _id: senderId });
  console.log(user);
  if (user?.profiles) {
    if (user.profiles.includes(newProfileId)) {
      return res
        .status(StatusCodes.OK)
        .json({ msg: "already user profiles is present" });
    }
  }
  const data = await UserProfiles.updateOne(
    { _id: senderId },
    {
      $push: {
        profiles: {
          $each: newProfileId,
        },
      },
    },
    {
      new: true,
      upsert: true,
    }
  );
  console.log(data);
  return res
    .status(StatusCodes.OK)
    .json({ msg: "Added user profile successfully" });
};

export { addNewProfileToUser };
