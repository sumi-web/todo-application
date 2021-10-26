import { Todo } from "../models/todo.js";

export const CreateTodo = async (req, res) => {
	const todoData = req.body;

	const todo = new Todo(todoData);

	try {
		const result = await todo.save();

		res.status(200).json({ data: result });
	} catch (err) {
		console.log("error found in saving todo", err);
		res.status(400).send(err);
	}
};

export const GetAllTodo = async (req, res) => {
	try {
		const allTodo = await Todo.find();

		if (allTodo) {
			res.status(200).json({ data: allTodo });
		}
	} catch (err) {
		console.log("err in getting all todos in server", err);
	}
};
