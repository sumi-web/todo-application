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
		res.status(400).send(err);
	}
};

export const UpdateTodo = async (req, res) => {
	const { todoId, data } = req.body;

	try {
		const updateTodo = await Todo.findByIdAndUpdate(todoId, data, { new: true });

		res.status(200).send("success");
		console.log("check updated todo", updateTodo);
	} catch (err) {
		console.log("error in updating todo in server", err);
		res.status(400).send(err);
	}
};

export const DeleteTodo = async (req, res) => {
	const { todoId } = req.params;

	if (todoId) {
		try {
			await Todo.findByIdAndDelete(todoId);
			res.status(200).json({ success: true });
		} catch (err) {
			console.log("err in deleting todo", err);
			res.status(400).send(err);
		}
	}
};
