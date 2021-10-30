import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { RemoveEmptyTodo, CreateTodo } from "../../../action/action-todo";

import Loader from "../../common/Loader";

const EmptyTodoCard = ({ heading, id }) => {
	const dispatch = useDispatch();

	const [cardValues, setCardValues] = useState({
		title: "",
		desc: "",
		isLoading: false,
	});

	const changeTitle = ({ target: { value } }) => {
		setCardValues({ ...cardValues, title: value });
	};

	const changeDesc = ({ target: { value } }) => {
		setCardValues({ ...cardValues, desc: value });
	};

	const removeTodo = () => {
		const status = getTodoStatus(heading);

		dispatch(RemoveEmptyTodo(status, id));
	};

	const saveTodo = async () => {
		if (!cardValues.title.trim() || !cardValues.desc.trim()) return;

		const status = getTodoStatus(heading);

		setCardValues({ ...cardValues, isLoading: true });

		await dispatch(CreateTodo(cardValues.title, cardValues.desc, status));

		setCardValues({ ...cardValues, isLoading: false });
	};

	const getTodoStatus = (listTitle) => {
		let status = "";

		if (listTitle === "To Do") {
			status = "todo";
		} else if (listTitle === "In Progress") {
			status = "progress";
		} else if (listTitle === "Completed") {
			status = "completed";
		}

		return status;
	};

	return (
		<div className="todo-box empty-card">
			<div className="card-title">
				<input type="text" placeholder="Give your task a title" value={cardValues.title} onChange={changeTitle} />
			</div>
			<textarea placeholder="Description..." value={cardValues.desc} onChange={changeDesc}>
				{cardValues.desc}
			</textarea>
			<div className="btn-group">
				<button className="save-btn" disabled={!cardValues.title.trim() || !cardValues.desc.trim() || cardValues.isLoading} onClick={saveTodo}>
					{cardValues.isLoading ? <Loader /> : "Create"}
				</button>
				<button className="cancel-btn" onClick={removeTodo}>
					Cancel
				</button>
			</div>
		</div>
	);
};

export default EmptyTodoCard;
