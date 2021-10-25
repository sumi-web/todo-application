import express from "express";

const router = express.Router();

import { logoutUser, userLogin, userSignUp, verifyToken } from "../controllers/authController.js";

router.post("/login", userLogin);

router.post("/signup", userSignUp);

router.get("/logout", logoutUser);

router.get("/verify-token", verifyToken);

export default router;
