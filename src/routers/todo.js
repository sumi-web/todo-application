import express from "express";

const router = express.Router();

import { CreateTodo, GetAllTodo } from "../controllers/todoController.js";

router.post("/create-todo", CreateTodo);

router.get("/all-todos", GetAllTodo);

// router.post("/delete-todo");

// router.put("/update-todo");

export default router;
