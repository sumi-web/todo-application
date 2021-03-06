import React, { Fragment } from "react";

import { Draggable } from "react-beautiful-dnd";

import { useDispatch } from "react-redux";

import TodoCard from "../../common/TodoCard";
import EmptyTodoCard from "../projects/EmptyTodoCard";

import { CreateEmptyTodo } from "../../../action/action-todo";

const TodoContainer = ({ heading, todoData }) => {
	const dispatch = useDispatch();

	const emptyTodoCardAlreadyExist = todoData.some((item) => !item.title && !item.desc);

	const addEmptyTodoCard = () => {
		let status = "";
		if (heading === "To Do") {
			status = "todo";
		} else if (heading === "In Progress") {
			status = "progress";
		} else {
			status = "completed";
		}

		dispatch(CreateEmptyTodo(status));
	};

	return (
		<>
			<div className="todo-heading">
				<h5>{heading}</h5>
				<span>{emptyTodoCardAlreadyExist ? todoData.length - 1 : todoData.length}</span>
			</div>
			<button disabled={emptyTodoCardAlreadyExist} className="add-todo-btn" onClick={addEmptyTodoCard}>
				+
			</button>

			<div className="all-todo-list">
				{todoData.map((item, i) => (
					<Fragment key={item._id}>
						{!item.title && !item.desc ? (
							<EmptyTodoCard id={item.id} heading={heading} />
						) : (
							<Draggable draggableId={item._id} index={i}>
								{(provided, snapshot) => (
									<div
										key={item._id}
										className={`todo-box ${snapshot.isDragging ? "moving" : ""}`}
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
									>
										<TodoCard todoId={item._id} userData={item.userId} title={item.title} description={item.desc} status={item.status} />
									</div>
								)}
							</Draggable>
						)}
					</Fragment>
				))}
			</div>
		</>
	);
};

export default TodoContainer;
