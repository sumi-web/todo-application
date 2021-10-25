import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import Checkbox from "../common/Checkbox";
import Input from "../../components/common/Input";

import { LoginUser } from "../../action/action-auth";
import FormHead from "../common/FormHead";

const Login = () => {
	const history = useHistory();

	const dispatch = useDispatch();

	const [inputValues, setInputValues] = useState({
		email: "",
		password: "",
		error: "",
		isLoading: false,
		isPasswordVisible: false,
	});

	const [inputError, setInputError] = useState({});

	const [isChecked, setIsChecked] = useState(false);

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

	const handleEnterKey = ({ keyCode }) => {
		console.log("key code", keyCode);
		if (keyCode === 13) {
			userLogin();
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

	const userLogin = async () => {
		if (inputValues.isLoading) return;

		const error = checkErrorsBeforeSaving();

		if (Object.keys(error).length > 0) {
			setInputError(error);
		} else {
			setInputValues({ ...inputValues, isLoading: true });
			const data = await dispatch(LoginUser(inputValues.email, inputValues.password));
			setInputValues({ ...inputValues, isLoading: false });

			if (data.isLoggedIn) {
				// navigate to home
				history.push("/home");
			} else {
				if (data.error === "email does not exist") {
					setInputError({ ...inputError, email: data.error });
				} else if (data.error === "incorrect password") {
					setInputError({ ...inputError, password: data.error });
				}
				setInputValues({ ...inputValues, error: data.error });
			}
		}
	};

	return (
		<div className="auth-form-box">
			<FormHead />
			<div className="form-bar"></div>

			<div className="form-inner-box">
				<h6>To Continue</h6>
				<p>We need your email and password</p>

				<div className="form-container">
					<Input name="email" type="text" placeholder="Email" error={!!inputError.email} value={inputValues.email} onFocus={deleteError} onChange={changeInputValues} />

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
						<i class="bi bi-exclamation-circle"></i>
						{inputValues.error}
					</span>
				</div>
				<button disabled={inputValues.isLoading} type="button" onClick={userLogin}>
					{inputValues.isLoading ? (
						<div class="spinner-border text-light spinner-border-sm" role="status">
							<span class="visually-hidden">Loading...</span>
						</div>
					) : (
						"Log In"
					)}
				</button>

				<Checkbox isChecked={isChecked} changeCheck={() => setIsChecked((prev) => !prev)} />
			</div>
		</div>
	);
};

export default Login;
