import React from "react";

const TodoCard = ({ id, title, description, status }) => {
	return (
		<>
			<h4 className="card-title">{title}</h4>
			<p className="card-desc">{description}</p>
			<div className="card-created-by">
				<h1>By sumit</h1>
			</div>
		</>
	);
};

export default TodoCard;
