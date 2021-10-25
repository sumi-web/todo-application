import { SET_USER_DATA, SET_USER_FORM_ERROR, TOGGLE_BETWEEN_LOGIN_AND_SIGNUP_FORM } from "../action/type";

const INITIAL_STATE = {
	authCredentials: {},
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
	return state;
}
