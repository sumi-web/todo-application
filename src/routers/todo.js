import express from "express";

const router = express.Router();

import { CreateTodo, DeleteTodo, GetAllTodo, UpdateTodo } from "../controllers/todoController.js";
import { tokenVerify } from "../middlewares/tokenVerifcation.js";

router.post("/create-todo", tokenVerify, CreateTodo);

router.get("/all-todos", tokenVerify, GetAllTodo);

router.patch("/update-todo", tokenVerify, UpdateTodo);

router.get("/delete-todo:todoId", tokenVerify, DeleteTodo);

export default router;
