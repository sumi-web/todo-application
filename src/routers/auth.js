import express from "express";

const router = express.Router();

import { userLogin, userSignUp } from "../controllers/authController.js";

router.post("/login", userLogin);

router.post("/signup", userSignUp);

export default router;
