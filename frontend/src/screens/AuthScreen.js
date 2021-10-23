import React from "react";
import TodoImage from "../assets/todo.PNG";
import Input from "../components/common/Input";

const AuthScreen = () => {
	return (
		<div className="auth-screen container-sm">
			<div className="row">
				<div className="col-md-6">
					<img src={TodoImage} />
				</div>
				<div className="col-md-6">
					<div className="auth-form-box">
						<div className="auth-form-head">
							<span>Log In</span>
							<span>Sign Up</span>
						</div>
						<div className="form bar"></div>

						<h3>To Continue</h3>
						<p>we need your Email and Password</p>

						<div className="form-container">
							<Input name="email" type="text" placeholder="Email" />
							<Input nam="password" type="password" placeholder="Password" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AuthScreen;
