import express from "express";
import { userlogin, userRegister } from "../controller/authController.js";
import { getItemById, getItems } from "../controller/userController.js";
const router = express.Router();

router.post("/user/register", userRegister);
router.post("/user/login", userlogin);
router.get("/users", getItems);
router.get("/user-detail/:id", getItemById);

export default router;
