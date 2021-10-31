import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import FileBase64 from "react-file-base64";

import Input from "../../common/Input";
import Loader from "../../common/Loader";
import userImage from "../../../assets/image1.png";

import { UpdateUserInfo } from "../../../action/action-auth";

const Setting = () => {
	const [fieldVisibility, setFieldVisibility] = useState({
		nameField: false,
		emailField: false,
	});

	const userData = useSelector((state) => state.auth_store.authCredentials);

	const [fullName, setFullName] = useState("");

	const [email, setEmail] = useState("");

	const [file, setFile] = useState("");

	const [isLoading, setIsLoading] = useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		setEmail(userData.email);
		setFullName(userData.name);
		setFile(userData.userImage);
	}, [userData]);

	const editName = () => {
		if (fullName.trim() !== userData.name) {
			setFullName(userData.name);
		}

		setFieldVisibility({ ...fieldVisibility, nameField: !fieldVisibility.nameField });
	};

	const editEmail = () => {
		if (email.trim() !== userData.email) {
			setEmail(userData.email);
		}

		setFieldVisibility({ ...fieldVisibility, emailField: !fieldVisibility.emailField });
	};

	const changeName = ({ target: { value } }) => {
		setFullName(value);
	};

	const changeEmail = ({ target: { value } }) => {
		setEmail(value);
	};

	const saveEditedUserDetails = async () => {
		if (!fullName && !email && !!file) return;

		setIsLoading(true);
		await dispatch(UpdateUserInfo(fullName, email, file));
		setIsLoading(false);
		setFieldVisibility({ nameField: false, emailField: false });
	};

	return (
		<div className="setting-screen">
			<div className="user-image">
				<img src={file ? file : userImage} alt="user-defined" />

				<div className="edit-image-box">
					<label>
						<i className="bi bi-pencil-square"></i>
						<FileBase64 multiple={false} onDone={({ base64 }) => setFile(base64)} />
					</label>
				</div>
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
				disabled={
					isLoading || (!fullName && !email && !file) || (userData.name === fullName.trim() && userData.email === email.trim() && userData.userImage === file)
				}
				onClick={saveEditedUserDetails}
			>
				{isLoading ? <Loader /> : "Save"}
			</button>
		</div>
	);
};

export default Setting;
