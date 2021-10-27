import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import Input from "../../common/Input";
import Modal from "../../common/Modal";
import Loader from "../../common/Loader";

import { SaveEditedTodoData } from "../../../action/action-todo";

const EditTodoModal = ({ isOpen, isLocked, onClose, action }) => {
	const dispatch = useDispatch();

	const [inputValues, setInputValues] = useState({
		title: "",
		desc: "",
		isLoading: false,
	});

	const todoData = useSelector((state) => state.todo_store.editTodo);

	useEffect(() => {
		setInputValues({ title: todoData.title || "", desc: todoData.desc || "" });
	}, [todoData]);

	const changeTitle = ({ target: { value } }) => {
		setInputValues({ ...inputValues, title: value });
	};

	const changeDesc = ({ target: { value } }) => {
		setInputValues({ ...inputValues, desc: value });
	};

	const saveEditedTodoDetails = async () => {
		setInputValues({ ...inputValues, isLoading: true });
		await dispatch(SaveEditedTodoData(todoData._id, inputValues.title, inputValues.desc));
		onClose();
		setInputValues({ title: "", desc: "", isLoading: false });
	};

	console.log(todoData);

	return (
		<Modal open={isOpen} locked={isLocked} onClose={onclose}>
			<div className="edit-todo-modal">
				<i className="bi bi-x-lg" onClick={() => onClose()}></i>
				<div className="edit-title">
					<Input label="Edit Title" placeholder="Title" value={inputValues.title} onChange={changeTitle} />
				</div>

				<div className="edit-created-by">
					<h5>Created By</h5>
					<h4>{todoData.userName}</h4>
				</div>
				<div className="edit-desc">
					<h5>Description</h5>
					<textarea rows={3} value={inputValues.desc} onChange={changeDesc} />
				</div>

				<button disabled={inputValues.isLoading} onClick={saveEditedTodoDetails}>
					{inputValues.isLoading ? <Loader /> : "Save"}
				</button>
			</div>
		</Modal>
	);
};

export default EditTodoModal;
