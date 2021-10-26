import { CREATE_EMPTY_TOKEN, REMOVE_EMPTY_TODO_CARD, SET_ALL_TODO, SET_CREATED_TODO } from "../action/type";

const INITIAL_STATE = {
	todoList: [],
	inProgressList: [],
	completedTodo: [],
};

export function todoReducer(state = INITIAL_STATE, action) {
	let newState = { ...state };

	if (action.type === CREATE_EMPTY_TOKEN) {
		const todoObj = {
			id: Date.now(),
			title: "",
			desc: "",
		};

		if (action.status === "To do") {
			newState.todoList = [todoObj, ...state.todoList];
		} else if (action.status === "In Progress") {
			newState.inProgressList = [todoObj, ...state.inProgressList];
		} else if (action.status === "Completed") {
			newState.completedTodo = [todoObj, ...state.completedTodo];
		}

		return newState;
	}

	if (action.type === REMOVE_EMPTY_TODO_CARD) {
		if (action.status === "To do") {
			newState.todoList = state.todoList.filter((item) => item.id !== action.id);
		} else if (action.status === "In Progress") {
			newState.todoList = state.inProgressList.filter((item) => item.id !== action.id);
		} else if (action.status === "Completed") {
			newState.todoList = state.completedTodo.filter((item) => item.id !== action.id);
		}

		return newState;
	}

	if (action.type === SET_CREATED_TODO) {
		if (action.todo.status === "todo") {
			const newArr = state.todoList.slice(1);
			newState.todoList = [action.todo, ...newArr];
		} else if (action.todo.status === "progress") {
			const newArr = state.inProgressList.slice(1);
			newState.inProgressList = [action.todo, ...newArr];
		} else if (action.todo.status === "completed") {
			const newArr = state.completedTodo.slice(1);
			newState.completedTodo = [action.todo, ...newArr];
		}

		return newState;
	}

	if (action.type === SET_ALL_TODO) {
		console.log("all todo", action.todo);
		newState.todoList = action.todo.filter((item) => item.status === "todo");
		newState.inProgressList = action.todo.filter((item) => item.status === "progress");
		newState.completedTodo = action.todo.filter((item) => item.status === "completed");
		return newState;
	}

	return newState;
}
