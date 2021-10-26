import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { CreateEmptyTodo } from "../../../action/action-todo";
import EmptyTodoCard from "../../common/EmptyTodoCard";

import TodoCard from "../../common/TodoCard";

const TodoContainer = ({ heading, todoData }) => {
	const dispatch = useDispatch();

	const emptyTodoCardAlreadyExist = todoData.some((item) => !item.title && !item.desc);

	const createTodoCard = () => {};

	return (
		<div className="todo-container">
			<div className="todo-heading">
				<h5>{heading}</h5>
				<span>{emptyTodoCardAlreadyExist ? todoData.length - 1 : todoData.length}</span>
			</div>
			<button disabled={emptyTodoCardAlreadyExist} className="add-todo-btn" onClick={() => dispatch(CreateEmptyTodo(heading))}>
				+
			</button>

			{/* showing todo card */}

			{todoData.map((item) => (
				<>{!item.title && !item.desc ? <EmptyTodoCard id={item.id} heading={heading} /> : <TodoCard key={item.id} title={item.title} description={item.desc} />}</>
			))}
		</div>
	);
};

export default TodoContainer;
