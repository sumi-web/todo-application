import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { DeleteTodo } from "../../action/action-todo";

import ConfirmModal from "./ConfirmModal";

const TodoCard = ({ userId, todoId, title, description, status, ...props }) => {
	const dispatch = useDispatch();

	const [state, setState] = useState({
		isOpen: false,
		isLoading: false,
	});

	const userName = useSelector((state) => state.auth_store.userList.find((user) => user._id === userId)?.name || "");

	const deleteCard = async () => {
		setState({ ...state, isLoading: true });
		await dispatch(DeleteTodo(todoId, status));
		setState({ isOpen: false, isLoading: false });
	};

	return (
		<>
			<h4 className="card-title">{title}</h4>
			<p className="card-desc">{description}</p>
			<div className="card-bottom">
				<h1>By {userName}</h1>
				<div className="card-btn">
					<button className="edit-card">
						<i class="bi bi-box-arrow-in-down-left"></i>
					</button>
					<button className="delete-card" onClick={() => setState({ ...state, isOpen: true })}>
						<i className="bi bi-trash"></i>
					</button>
				</div>
			</div>
			<ConfirmModal
				isOpen={state.isOpen}
				isLoading={state.isLoading}
				title="Delete"
				onClose={() => setState({ ...state, isOpen: false })}
				action={deleteCard}
			/>
		</>
	);
};

export default TodoCard;
