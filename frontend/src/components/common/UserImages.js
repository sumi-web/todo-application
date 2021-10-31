import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";

import defaultImage from "../../assets/image1.png";
import blankImage from "../../assets/Ellipse32.png";
import AllUserModal from "../home/projects/AllUserModal";

const UserImages = () => {
	const [state, setState] = useState({ isOpen: false, isLocked: false });

	const userList = useSelector((state) => state.auth_store.userList);

	const openModal = () => setState({ isOpen: true, isLocked: true });

	const closeModal = () => setState({ isOpen: false, isLocked: false });

	return (
		<>
			<div className="user-image-group" onClick={openModal}>
				{userList.map((user, i) => (
					<Fragment key={user._id}>
						{i < 5 && (
							<>
								{i < 4 ? (
									<img className={`user${i}`} src={user.userImage ? user.userImage : defaultImage} alt="user" />
								) : (
									<div className="last-image">
										<img src={blankImage} alt="user" />
										<small>{userList.length - 4}</small>
									</div>
								)}
							</>
						)}
					</Fragment>
				))}
			</div>
			<AllUserModal isOpen={state.isOpen} isLocked={state.isLocked} onClose={closeModal} />
		</>
	);
};

export default UserImages;
