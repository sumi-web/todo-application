import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Input from "../common/Input";
import Loader from "../common/Loader";
import FormHead from "../common/FormHead";

import { SignUpUser } from "../../action/action-auth";

const SignUp = () => {
	const history = useHistory();

	const dispatch = useDispatch();

	const [inputValues, setInputValues] = useState({
		fullName: "",
		email: "",
		password: "",
		error: "",
		isLoading: false,
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

	const handleEnterKey = ({ keyCode }) => {
		if (keyCode === 13) {
			userSignUp();
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
		if (inputValues.isLoading) return;
		const error = checkErrorsBeforeSaving();

		if (Object.keys(error).length > 0) {
			setInputError(error);
		} else {
			setInputValues({ ...inputValues, isLoading: true });
			const data = await dispatch(SignUpUser(inputValues.fullName, inputValues.email, inputValues.password));

			setInputValues({ ...inputValues, isLoading: false });
			if (data.isLoggedIn) {
				// navigate to dashboard
				history.push("/home/projects");
			} else {
				if (data.error === "email already exist") {
					setInputValues({ ...inputValues, error: data.error });
					setInputError({ ...inputError, email: data.error });
				}
			}
		}
	};
	return (
		<div className="auth-form-box">
			<FormHead />

			<div className="form-bar"></div>

			<div className="form-inner-box">
				<div className="form-container">
					<Input
						name="fullName"
						type="text"
						placeholder="FullName"
						error={!!inputError.fullName}
						value={inputValues.fullName}
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
						onKeyUp={handleEnterKey}
					/>
					<span className={!!inputValues.error ? "visible" : "hidden"}>
						<i className="bi bi-exclamation-circle"></i>
						{inputValues.error}
					</span>
				</div>
				<button disabled={inputValues.isLoading} type="button" onClick={userSignUp}>
					{inputValues.isLoading ? <Loader /> : "Sign Up"}
				</button>
			</div>
		</div>
	);
};

export default SignUp;
