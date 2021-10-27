import express from "express";

const router = express.Router();

import { GetAllUsers, logoutUser, UpdateUser, userLogin, userSignUp, verifyToken } from "../controllers/authController.js";

router.post("/login", userLogin);

router.post("/signup", userSignUp);

router.get("/logout", logoutUser);

router.get("/verify-token", verifyToken);

router.get("/all-users", GetAllUsers);

router.patch("/update-user", UpdateUser);

export default router;
