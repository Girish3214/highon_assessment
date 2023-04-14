import express from "express";
import { userRegister } from "../controllers/userController.js";

const router = express.Router();

router.route("/").post(userRegister);

export default router;
