import express from "express";
import * as authControllers from "../Controllers/authController.js";

const router = express.Router();

router.post("/register", authControllers.register);
router.post("/login", authControllers.login);
router.post("/forgot-password", authControllers.forgetPassword);
router.patch("/reset-password/:token", authControllers.resetPassword);

export default router;
