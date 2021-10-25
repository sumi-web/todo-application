import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { ToggleBetweenLoginAndSignUpForm } from "../../action/action-auth";

const FormHead = () => {
	const dispatch = useDispatch();

	const isSignUpFormVisible = useSelector((state) => state.auth_store.isSignFormVisible);

	const hideSignUpForm = () => {
		dispatch(ToggleBetweenLoginAndSignUpForm(false));
	};

	const showSignUpForm = () => {
		dispatch(ToggleBetweenLoginAndSignUpForm(true));
	};

	return (
		<div className="auth-form-head">
			<span className={isSignUpFormVisible ? "" : "active"} onClick={hideSignUpForm}>
				Log In
			</span>
			<span className={isSignUpFormVisible ? "active" : ""} onClick={showSignUpForm}>
				Sign Up
			</span>
		</div>
	);
};

export default FormHead;
