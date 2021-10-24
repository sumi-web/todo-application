import { SET_USER_DATA, SET_USER_FORM_ERROR } from "../action/type";

const INITIAL_STATE = {
	authCredentials: {},
	// userError: "",
};

export function authReducer(state = INITIAL_STATE, action) {
	let newState = { ...state };

	if (action.type === SET_USER_DATA) {
		newState.authCredentials = action.data;
		return newState;
	}

	// if (action.type === SET_USER_FORM_ERROR) {
	// 	newState.userError = action.error;
	// 	return newState;
	// }

	return state;
}
