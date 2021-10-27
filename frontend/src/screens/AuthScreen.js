import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import TodoImage from "../assets/todo.PNG";
import Login from "../components/login/Login";
import SignUp from "../components/login/SignUp";

const AuthScreen = () => {
	const isSignUpFormVisible = useSelector((state) => state.auth_store.isSignFormVisible);

	return (
		<>
			<div className="auth-screen">
				<div className="login-image">
					<img src={TodoImage} alt="todo" />
				</div>
				<div className="auth-form">{isSignUpFormVisible ? <SignUp /> : <Login />}</div>
			</div>
		</>
	);
};

export default AuthScreen;
