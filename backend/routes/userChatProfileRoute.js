import express from "express";
import { addNewProfileToUser } from "../controllers/userChatProfilesController.js";

const router = express.Router();

router.route("/").put(addNewProfileToUser);

export default router;
