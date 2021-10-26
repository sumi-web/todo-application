import React from "react";

const TodoCard = ({ title, description }) => {
	return (
		<div className="todo-card">
			<h4 className="card-title">{title}</h4>
			<p className="card-desc">{description}</p>
			<div className="card-created-by">
				<h6>sumit</h6>
			</div>
		</div>
	);
};

export default TodoCard;
