import { CREATE_EMPTY_TOKEN, MOVE_SELECTED_TODO_CARD, REMOVE_EMPTY_TODO_CARD, SET_ALL_TODO, SET_CREATED_TODO } from "./type";

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
