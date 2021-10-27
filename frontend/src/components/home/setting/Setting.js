import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import userImage from "../../../assets/847969.png";

import Input from "../../common/Input";
import Loader from "../../common/Loader";

import { UpdateUserInfo } from "../../../action/action-auth";

const Setting = () => {
	const [fieldVisibility, setFieldVisibility] = useState({
		nameField: false,
		emailField: false,
	});

	const [fullName, setFullName] = useState("");

	const [email, setEmail] = useState("");

	const [isLoading, setIsLoading] = useState(false);

	const dispatch = useDispatch();

	const userData = useSelector((state) => state.auth_store.authCredentials);

	const editName = () => {
		setStoredValuesInState();

		setFieldVisibility({ ...fieldVisibility, nameField: !fieldVisibility.nameField });
	};

	const editEmail = () => {
		setStoredValuesInState();

		setFieldVisibility({ ...fieldVisibility, emailField: !fieldVisibility.emailField });
	};

	const changeName = ({ target: { value } }) => {
		setFullName(value);
	};

	const changeEmail = ({ target: { value } }) => {
		setEmail(value);
	};

	const setStoredValuesInState = () => {
		if (fullName.trim() !== userData.name) {
			setFullName(userData.name);
		}

		if (email.trim() !== userData.email) {
			setEmail(userData.email);
		}
	};

	const saveEditedUserDetails = async () => {
		if (!fullName && !email) return;

		setIsLoading(true);
		await dispatch(UpdateUserInfo(fullName, email));
		setIsLoading(false);
		setFieldVisibility({ nameField: false, emailField: false });
	};

	return (
		<div className="setting-screen">
			<div className="user-image">
				<img src={userImage} alt="user" />
			</div>

			<div className="user-info-box">
				<div className="name-box">
					<label>Full Name</label>
					<i className="bi bi-pencil-square" onClick={editName}></i>

					{fieldVisibility.nameField ? <Input placeholder="Full Name" value={fullName} onChange={changeName} /> : <h4>{userData.name}</h4>}
				</div>
				<div className="email-box">
					<label>Email</label>
					<i className="bi bi-pencil-square" onClick={editEmail}></i>

					{fieldVisibility.emailField ? <Input placeholder="Email" value={email} onChange={changeEmail} /> : <h4>{userData.email}</h4>}
				</div>
			</div>
			<button
				disabled={isLoading || (!fullName && !email) || (userData.name === fullName.trim() && userData.email === email.trim())}
				onClick={saveEditedUserDetails}
			>
				{isLoading ? <Loader /> : "Save"}
			</button>
		</div>
	);
};

export default Setting;
