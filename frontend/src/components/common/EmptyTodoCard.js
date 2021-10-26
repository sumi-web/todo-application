import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { RemoveEmptyTodo, CreateTodo } from "../../action/action-todo";

const EmptyTodoCard = ({ heading, id }) => {
	const dispatch = useDispatch();

	const [cardValues, setCardValues] = useState({
		title: "",
		desc: "",
	});

	const changeTitle = ({ target: { value } }) => {
		setCardValues({ ...cardValues, title: value });
	};

	const changeDesc = ({ target: { value } }) => {
		setCardValues({ ...cardValues, desc: value });
	};

	const removeTodo = () => {
		dispatch(RemoveEmptyTodo(heading, id));
	};

	const saveTodo = () => {
		if (!cardValues.title.trim() || !cardValues.desc.trim()) return;

		let status = "";

		if (heading === "To do") {
			status = "todo";
		} else if (heading === "In Progress") {
			status = "progress";
		} else if (heading === "Completed") {
			status = "completed";
		}

		dispatch(CreateTodo(cardValues.title, cardValues.desc, status));
	};

	return (
		<div className="todo-card empty-card">
			<div className="card-title">
				<input type="text" placeholder="Give your task a title" value={cardValues.title} onChange={changeTitle} />
			</div>
			<textarea placeholder="Description..." value={cardValues.desc} onChange={changeDesc}>
				{cardValues.desc}
			</textarea>
			<div className="btn-group">
				<button className="save-btn" disabled={!cardValues.title.trim() || !cardValues.desc.trim()} onClick={saveTodo}>
					Save
				</button>
				<button className="cancel-btn" onClick={removeTodo}>
					Cancel
				</button>
			</div>
		</div>
	);
};

export default EmptyTodoCard;
