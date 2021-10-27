import React from "react";
import Loader from "./Loader";

import Modal from "./Modal";

const ConfirmModal = ({ isOpen, isLoading, title, onClose, action }) => {
	return (
		<Modal open={isOpen} onClose={onClose}>
			<div className="modal-body">
				<div className="confirm-modal">
					<h2>{`Are you really want to ${title.toLowerCase()}?`}</h2>
					<div className="confirm-btn">
						<button className="logout-btn" disabled={isLoading || false} onClick={action}>
							{isLoading ? <Loader /> : title}
						</button>
						<button className="cancel-btn" onClick={onClose}>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default ConfirmModal;
