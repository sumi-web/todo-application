import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Input from "../../components/common/Input";
import { SignUpUser } from "../../action/action-auth";

const SignUp = ({ hideSignUpForm, showSignUpForm }) => {
	const dispatch = useDispatch();

	const [inputValues, setInputValues] = useState({
		fullName: "",
		email: "",
		password: "",
		error: "",
		isPasswordVisible: false,
	});

	const [inputError, setInputError] = useState({});

	const changeInputValues = ({ target: { name, value } }) => {
		const valuesObj = { ...inputValues, [name]: value };
		if (valuesObj.fullName.trim().length > 0 && valuesObj.email.trim().length > 0 && valuesObj.password.trim().length > 0 && !!valuesObj.error) {
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
		if (inputValues.email.trim().length === 0 && inputValues.password.trim().length === 0 && inputValues.fullName.trim().length === 0) {
			setInputValues({ ...inputValues, error: "name, email and password can not be empty" });
			error.fullName = "name can not be empty";
			error.email = "email can not be empty";
			error.password = "password can not be empty";
		} else {
			const emailRegex = /\S+@\S+\.\S+/;

			if (inputValues.fullName.trim().length === 0) {
				error.fullName = "name can not be empty";
			}

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

			if (!!error.fullName) {
				setInputValues({ ...inputValues, error: error.fullName });
			} else if (!!error.email) {
				setInputValues({ ...inputValues, error: error.email });
			} else if (!!error.password) {
				setInputValues({ ...inputValues, error: error.password });
			}
		}

		return error;
	};

	const userSignUp = async () => {
		const error = checkErrorsBeforeSaving();
		if (Object.keys(error).length > 0) {
			setInputError(error);
		} else {
			const data = await dispatch(SignUpUser(inputValues.fullName, inputValues.email, inputValues.password));
			if (data.isLoggedIn) {
				// do something
			} else {
				if (data.error) {
					setInputValues({ ...inputValues, error: data.error });
				}
			}
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
				<div className="form-container">
					<Input
						name="fullName"
						type="text"
						placeholder="FullName"
						error={!!inputError.name}
						value={inputValues.name}
						onFocus={deleteError}
						onChange={changeInputValues}
					/>
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
				<button type="button" onClick={userSignUp}>
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

export default SignUp;
