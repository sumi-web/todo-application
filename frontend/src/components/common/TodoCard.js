import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import ConfirmModal from "./ConfirmModal";
import EditTodoModal from "../home/projects/EditTodoModal";
import defaultImage from "../../assets/image1.png";

import { DeleteTodo, SetEditModalData } from "../../action/action-todo";

const TodoCard = ({ userId, todoId, title, description, status, ...props }) => {
	const dispatch = useDispatch();

	// const userName = useSelector((state) => state.auth_store.userList.find((user) => user._id === userId)?.name || "");

	const [delState, setDelState] = useState({
		isOpen: false,
		isLoading: false,
	});

	const [editState, setEditState] = useState({
		isOpen: false,
		isLocked: true,
	});

	const openEditModal = () => {
		dispatch(SetEditModalData(userId, todoId, status));
		setEditState({ ...editState, isOpen: true, isLoading: true });
	};

	const closeEditModal = () => {
		setEditState({ ...editState, isOpen: false, isLoading: false });
	};

	const deleteCard = async () => {
		setDelState({ ...delState, isLoading: true });
		await dispatch(DeleteTodo(todoId, status));
		setDelState({ isOpen: false, isLoading: false });
	};

	return (
		<>
			<div className="todo-card" onClick={openEditModal}>
				<h4 className="card-title">{title}</h4>
				<p className="card-desc">{description}</p>
				<div className="card-bottom">
					<img src={defaultImage} alt="user image" />
					<i class="bi bi-chat-left"></i>
				</div>
				<i class="bi bi-x"></i>
			</div>
			<ConfirmModal isOpen={delState.isOpen} isLoading={delState.isLoading} title="Delete" onClose={() => setDelState({ ...delState, isOpen: false })} action={deleteCard} />
			<EditTodoModal isOpen={editState.isOpen} isLocked={editState.isLocked} onClose={closeEditModal} />
		</>
	);
};

export default TodoCard;
