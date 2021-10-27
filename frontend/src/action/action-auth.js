import { SET_ALL_USERS, SET_USER_DATA, TOGGLE_BETWEEN_LOGIN_AND_SIGNUP_FORM } from "./type";

export const SignUpUser = (fullName, email, password) => async (dispatch) => {
	try {
		const res = await fetch("/auth/signup", {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ fullName, email, password }),
		});

		const data = await res.json();

		if (data.isLoggedIn) {
			dispatch({ type: SET_USER_DATA, data: data.user });
		}

		return data;
	} catch (err) {
		console.log("error in signing up user", err);
	}
};

export const LoginUser = (email, password) => async (dispatch) => {
	try {
		const res = await fetch("/auth/login", {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		});

		const data = await res.json();
		if (data.isLoggedIn) {
			dispatch({ type: SET_USER_DATA, data: data.user });
		}

		return data;
	} catch (err) {
		console.log("error in logging the user", err);
	}
};

export const VerifyUserToken = () => async (dispatch) => {
	try {
		const res = await fetch("/auth/verify-token", {
			credentials: "include",
		});
		const data = await res.json();
		console.log("check data", data);
		if (data.isLoggedIn) {
			dispatch({ type: SET_USER_DATA, data: data.user });
			return true;
		}
		return false;
	} catch (err) {
		console.log("error in verifying token", err);
		return false;
	}
};

export const ToggleBetweenLoginAndSignUpForm = (value) => ({ type: TOGGLE_BETWEEN_LOGIN_AND_SIGNUP_FORM, value });

export const UserLogout = () => async (dispatch) => {
	await fetch("/auth/logout");

	dispatch({ type: SET_USER_DATA, data: {} });
};

export const GetAllUsers = () => async (dispatch) => {
	try {
		const res = await fetch("/auth/all-users");
		const data = await res.json();

		dispatch({ type: SET_ALL_USERS, users: data.data });
	} catch (err) {
		console.log("err found in getting all users", err);
	}
};
