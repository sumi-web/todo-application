import { SET_USER_DATA, SET_USER_FORM_ERROR } from "./type";

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
		console.log("error in fetching data", err);
	}
};
