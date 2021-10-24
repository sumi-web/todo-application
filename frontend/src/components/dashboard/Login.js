import React, { useState } from "react";

import Input from "../../components/common/Input";

const Login = ({ showSignUpForm, hideSignUpForm }) => {
	const [inputValues, setInputValues] = useState({
		email: "",
		password: "",
		error: "",
		isPasswordVisible: false,
	});

	const [inputError, setInputError] = useState({});

	console.log("check inputValues", inputValues);

	const changeInputValues = ({ target: { name, value } }) => {
		const valuesObj = { ...inputValues, [name]: value };
		if (valuesObj.email.trim().length > 0 && valuesObj.password.trim().length > 0 && !!valuesObj.error) {
			valuesObj.error = "";
		}

		setInputValues({ ...valuesObj });
	};

	const togglePasswordVisibility = () => {
		setInputValues({ ...inputValues, isPasswordVisible: !inputValues.isPasswordVisible });
	};

	const deleteError = ({ target: { name } }) => {
		const errors = { ...inputError };
		if (!!inputError[name]) {
			delete errors[name];
			setInputError(errors);
		}
	};

	const checkErrorsBeforeSaving = () => {
		let error = { ...inputError };

		//validation for name
		if (inputValues.email.trim().length === 0 && inputValues.password.trim().length === 0) {
			setInputValues({ ...inputValues, error: "email and password can not be empty" });
			error.email = "email can not be empty";
			error.password = "password can not be empty";
		} else {
			const emailRegex = /\S+@\S+\.\S+/;
			//validation for email
			if (inputValues.email.trim().length === "") {
				error.email = "email can not be empty";
				setInputValues({ ...inputValues, error: error.email });
			} else if (!emailRegex.test(inputValues.email)) {
				error.email = "invalid email format";
				setInputValues({ ...inputValues, error: error.email });
			}

			//validation password

			if (inputValues.password.trim().length === 0) {
				error.password = "password can not be empty";
			} else if (inputValues.password.trim().length <= 5) {
				error.password = "password should be at least 6 characters";
			}

			if (!error.email) {
				setInputValues({ ...inputValues, error: error.password });
			}
		}

		return error;
	};

	const logInUser = () => {
		const error = checkErrorsBeforeSaving();
		console.log("check error", error);
		if (Object.keys(error).length > 0) {
			setInputError(error);
		} else {
			console.log("submit form");
		}
	};

	return (
		<div className="auth-form-box">
			<div className="auth-form-head">
				<span onClick={hideSignUpForm}>Log In</span>
				<span onClick={showSignUpForm}>Sign Up</span>
			</div>
			<div className="form-bar"></div>

			<div className="form-inner-box">
				<h6>To Continue</h6>
				<p>We need your email and password</p>

				<div className="form-container">
					<Input
						name="email"
						type="text"
						placeholder="Email"
						error={!!inputError.email}
						value={inputValues.email}
						onFocus={deleteError}
						onChange={changeInputValues}
					/>

					<Input
						name="password"
						type={inputValues.isPasswordVisible ? "text" : "password"}
						placeholder="Password"
						togglePasswordVisibility={togglePasswordVisibility}
						passwordVisibility={inputValues.isPasswordVisible}
						error={!!inputError.password}
						value={inputValues.password}
						onChange={changeInputValues}
						onFocus={deleteError}
					/>
					<span className={!!inputValues.error ? "visible" : "hidden"}>
						<i class="bi bi-exclamation-circle"></i>
						{inputValues.error}
					</span>
				</div>
				<button type="button" onClick={logInUser}>
					Log In
				</button>

				<div className="checkbox-input-box">
					<label class="checkbox">
						<span class="checkbox__input">
							<input type="checkbox" name="checkbox" checked />
							<span class="checkbox__control">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
									<path fill="none" stroke="currentColor" stroke-width="3" d="M1.73 12.91l6.37 6.37L22.79 4.59" />
								</svg>
							</span>
						</span>
					</label>
					<small className="remember">Remember Me</small>
				</div>
			</div>
		</div>
	);
};

export default Login;
