import { SET_ALL_USERS, SET_USER_DATA, TOGGLE_BETWEEN_LOGIN_AND_SIGNUP_FORM } from "../action/type";

const INITIAL_STATE = {
	authCredentials: {},
	userList: [],
	isSignFormVisible: false,
};

export function authReducer(state = INITIAL_STATE, action) {
	let newState = { ...state };

	if (action.type === SET_USER_DATA) {
		newState.authCredentials = action.data;
		return newState;
	}

	if (action.type === TOGGLE_BETWEEN_LOGIN_AND_SIGNUP_FORM) {
		newState.isSignFormVisible = action.value;
		return newState;
	}

	if (action.type === SET_ALL_USERS) {
		newState.userList = action.users;
		console.log("check", newState);
		return newState;
	}

	return state;
}
