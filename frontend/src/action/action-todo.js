import { CREATE_EMPTY_TOKEN, DELETE_TODO, MOVE_SELECTED_TODO_CARD, REMOVE_EDIT_MODAL_DATA, REMOVE_EMPTY_TODO_CARD, SET_ALL_TODO, SET_CREATED_TODO, SET_EDIT_TODO_DATA, UPDATE_TODO } from "./type";

export const CreateEmptyTodo = (heading) => ({ type: CREATE_EMPTY_TOKEN, heading });

export const RemoveEmptyTodo = (heading, id) => ({ type: REMOVE_EMPTY_TODO_CARD, heading, id });

export const CreateTodo = (title, desc, status) => async (dispatch, getState) => {
	const { _id } = getState().auth_store.authCredentials;

	try {
		const res = await fetch("/home/create-todo", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ title, desc, status, userId: _id }),
		});

		const data = await res.json();

		if (data.data) {
			dispatch({ type: SET_CREATED_TODO, status, todo: data.data });
		}

		return false;
	} catch (err) {
		console.log("error in saving todo to server", err);
		return false;
	}
};

export const GetAllTodo = () => async (dispatch, getState) => {
	try {
		const res = await fetch("/home/all-todos");

		const data = await res.json();
		if (data.data) {
			dispatch({ type: SET_ALL_TODO, todo: data.data });
		}
	} catch (err) {
		console.log("error found in getting all todos", err);
	}
};

export const MoveSelectedTodoCard = (dragId, from, to) => async (dispatch) => {
	dispatch({ type: MOVE_SELECTED_TODO_CARD, dragId, from, to });

	await fetch("/home/update-todo", {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ todoId: dragId, data: { status: to.droppableId } }),
	});
};

export const DeleteTodo = (todoId, status) => async (dispatch) => {
	try {
		const res = await fetch("/home/delete-todo" + todoId);
		const data = await res.json();
		console.log("check here", data);
		if (data.success) {
			dispatch({ type: DELETE_TODO, todoId, status });
		}
	} catch (err) {
		console.log("error in deleting todo", err);
	}
};

export const SetEditModalData = (userId, todoId, status) => (dispatch, getState) => {
	const userList = getState().auth_store.userList;

	const userName = userList.find((user) => user._id === userId).name;
	if (userName) {
		dispatch({ type: SET_EDIT_TODO_DATA, todoId, status, userName });
	} else {
		console.log("didn't find user todo");
	}
};

export const SaveEditedTodoData = (todoId, title, desc) => async (dispatch) => {
	try {
		const res = await fetch("/home/update-todo", {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ todoId: todoId, data: { title, desc } }),
		});

		const data = await res.json();

		console.log("incoming data on edit", data);

		if (data.success) {
			dispatch({ type: UPDATE_TODO, data: data.data });
		}
	} catch (err) {
		console.log("err in editing todo details", err);
	}
};

export const RemoveEditModalData = () => ({ type: REMOVE_EDIT_MODAL_DATA });
