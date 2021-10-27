import { CREATE_EMPTY_TOKEN, MOVE_SELECTED_TODO_CARD, REMOVE_EMPTY_TODO_CARD, SET_ALL_TODO, SET_CREATED_TODO } from "../action/type";

const INITIAL_STATE = {
	todo: { heading: "To Do", list: [] },
	progress: { heading: "In Progress", list: [] },
	completed: { heading: "Completed", list: [] },
};

export function todoReducer(state = INITIAL_STATE, action) {
	let newState = { ...state };

	if (action.type === CREATE_EMPTY_TOKEN) {
		const todoObj = {
			id: Date.now(),
			title: "",
			desc: "",
		};

		newState[action.heading].list = [todoObj, ...state[action.heading].list];

		return newState;
	}

	if (action.type === REMOVE_EMPTY_TODO_CARD) {
		newState[action.heading].list = state[action.heading].list.filter((item) => item.id !== action.id);

		return newState;
	}

	if (action.type === SET_CREATED_TODO) {
		const newList = state[action.status].list.slice(1);
		newState[action.status].list = [action.todo, ...newList];

		return newState;
	}

	if (action.type === SET_ALL_TODO) {
		newState.todo.list = action.todo.filter((item) => item.status === "todo");
		newState.progress.list = action.todo.filter((item) => item.status === "progress");
		newState.completed.list = action.todo.filter((item) => item.status === "completed");
		return newState;
	}

	if (action.type === MOVE_SELECTED_TODO_CARD) {
		const findDragCard = state[action.from.droppableId].list.find((item) => item._id === action.dragId);
		if (findDragCard) {
			if (action.from.droppableId !== action.to.droppableId) {
				const newDragCard = { ...findDragCard };

				newDragCard.status = action.to.droppableId;

				const destinationList = [...state[action.to.droppableId].list];
			
				newState[action.from.droppableId].list = state[action.from.droppableId].list.filter((item) => item._id !== action.dragId);
				destinationList.splice(action.to.index, 0, newDragCard);
				newState[action.to.droppableId].list = destinationList;
			} else {
				const targetList = [...state[action.to.droppableId].list];
				targetList.splice(action.from.index, 1);
				targetList.splice(action.to.index, 0, findDragCard);
				newState.[action.to.droppableId].list=targetList
			}
		}

		return newState;
	}

	return newState;
}
