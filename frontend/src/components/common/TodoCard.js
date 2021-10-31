import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import ConfirmModal from "./ConfirmModal";
import EditTodoModal from "../home/projects/EditTodoModal";
import defaultImage from "../../assets/image1.png";

import { DeleteTodo, SetEditModalData } from "../../action/action-todo";

const TodoCard = ({ userData, todoId, title, description, status, ...props }) => {
	const dispatch = useDispatch();

	const [delState, setDelState] = useState({
		isOpen: false,
		isLoading: false,
	});

	const [editState, setEditState] = useState({
		isOpen: false,
		isLocked: true,
	});

	const openEditModal = () => {
		dispatch(SetEditModalData(todoId, status));
		setEditState({ ...editState, isOpen: true, isLoading: true });
	};

	const closeEditModal = () => {
		setEditState({ ...editState, isOpen: false, isLoading: false });
	};

	const openDelModal = (e) => {
		e.stopPropagation();
		setDelState({ ...delState, isOpen: true });
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
					<img src={userData?.userImage ? userData.userImage : defaultImage} alt="user" />
					<i className="bi bi-chat-left"></i>
				</div>
				<i className="bi bi-x" onClick={openDelModal}></i>
			</div>

			<ConfirmModal
				isOpen={delState.isOpen}
				isLoading={delState.isLoading}
				title="Delete"
				onClose={() => setDelState({ ...delState, isOpen: false })}
				action={deleteCard}
			/>
			<EditTodoModal isOpen={editState.isOpen} isLocked={editState.isLocked} onClose={closeEditModal} />
		</>
	);
};

export default TodoCard;
