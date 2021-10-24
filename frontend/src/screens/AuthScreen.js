import React, { useState, useEffect } from "react";

import TodoImage from "../assets/todo.PNG";
import Login from "../components/dashboard/Login";
import SignUp from "../components/dashboard/SignUp";

const AuthScreen = () => {
	const [isSignUpFormVisible, setShowSignUpForm] = useState(false);

	console.log(isSignUpFormVisible);

	const hideSignUpForm = () => {
		setShowSignUpForm(false);
	};

	const showSignUpForm = () => {
		setShowSignUpForm(true);
	};

	console.log(isSignUpFormVisible);

	return (
		<>
			<div className="auth-screen">
				<div className="container">
					<div className="row">
						<div className="col-md-6">
							<img src={TodoImage} alt="todo" />
						</div>
						<div className="col-md-6">
							{isSignUpFormVisible ? (
								<SignUp hideSignUpForm={hideSignUpForm} showSignUpForm={showSignUpForm} />
							) : (
								<Login hideSignUpForm={hideSignUpForm} showSignUpForm={showSignUpForm} />
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AuthScreen;
