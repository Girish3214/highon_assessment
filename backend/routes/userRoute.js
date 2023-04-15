import express from "express";
import { getAllUsers, userRegister } from "../controllers/userController.js";

const router = express.Router();

router.route("/").post(userRegister);
router.route("/all/:id").get(getAllUsers);

export default router;
