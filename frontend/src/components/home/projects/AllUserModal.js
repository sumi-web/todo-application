import React from "react";
import { useSelector } from "react-redux";

import defaultImage from "../../../assets/image1.png";

import Modal from "../../common/Modal";

const AllUserModal = ({ isOpen, isLocked, onClose }) => {
	const userList = useSelector((state) => state.auth_store.userList);

	return (
		<Modal open={isOpen} locked={isLocked} onClose={onClose}>
			<div className="all-users-list">
				<div className="head">
					<h4>Project Members</h4>
					<i className="bi bi-x" onClick={onClose}></i>
				</div>
				<div className="user-container">
					{userList.map((user, i) => (
						<div key={user._id} className="user-card">
							<img src={user.userImage ? user.userImage : defaultImage} alt="user" />
							<div className="user-info">
								<h5>{user.name}</h5>
								<p>{user.email}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</Modal>
	);
};

export default AllUserModal;
