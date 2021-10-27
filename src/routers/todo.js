import express from "express";

const router = express.Router();

import { CreateTodo, GetAllTodo, UpdateTodo } from "../controllers/todoController.js";

router.post("/create-todo", CreateTodo);

router.get("/all-todos", GetAllTodo);

router.patch("/update-todo", UpdateTodo);

// router.post("/delete-todo");

// router.put("/update-todo");

export default router;
