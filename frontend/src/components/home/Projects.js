import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { GetAllTodo } from "../../action/action-todo";

import TodoContainer from "./projects/TodoContainer";

const Projects = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(GetAllTodo());
	}, [dispatch]);

	const todoData = useSelector((state) => ({
		todoList: state.todo_store.todoList,
		inProgressList: state.todo_store.inProgressList,
		completedTodo: state.todo_store.completedTodo,
	}));

	return (
		<div className="todo-container-area">
			<TodoContainer heading="To do" todoData={todoData.todoList} />
			<TodoContainer heading="In Progress" todoData={todoData.inProgressList} />
			<TodoContainer heading="Completed" todoData={todoData.completedTodo} />
		</div>
	);
};

export default Projects;
