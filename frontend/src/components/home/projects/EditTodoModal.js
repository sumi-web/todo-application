import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import Modal from "../../common/Modal";
import Loader from "../../common/Loader";
import userImage from "../../../assets/image1.png";

import { RemoveEditModalData, SaveEditedTodoData } from "../../../action/action-todo";

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

	const closeModal = () => {
		dispatch(RemoveEditModalData());
		onClose();
	};

	const saveEditedTodoDetails = async () => {
		setInputValues({ ...inputValues, isLoading: true });
		await dispatch(SaveEditedTodoData(todoData._id, inputValues.title, inputValues.desc));
		onClose();
		setInputValues({ title: "", desc: "", isLoading: false });
	};

	return (
		<Modal className="edit-todo-screen" open={isOpen} locked={isLocked} onClose={onclose}>
			<div className="edit-todo-modal">
				<div className="top">
					<input placeholder="Title" value={inputValues.title} onChange={changeTitle} />
					<div className="edit-title-bar"></div>

					<div className="edit-created-by">
						<h5>Created By</h5>
						<div className="user-info">
							<img src={userImage} alt="user" />
							<h4>{todoData.userName}</h4>
						</div>
					</div>
					<div className="edit-desc">
						<h5>Description</h5>
						<textarea placeholder="Description..." rows={4} value={inputValues.desc} onChange={changeDesc} />
					</div>
				</div>

				<div className="edit-btn-group">
					<button
						className="save-btn"
						disabled={
							inputValues.isLoading || !inputValues.title || (inputValues.title === todoData.title && inputValues.desc === todoData.desc) || !inputValues.desc
						}
						onClick={saveEditedTodoDetails}
					>
						{inputValues.isLoading ? <Loader /> : "Save"}
					</button>
					<button className="cancel-btn" onClick={closeModal}>
						Cancel
					</button>
				</div>
			</div>
		</Modal>
	);
};

export default EditTodoModal;
