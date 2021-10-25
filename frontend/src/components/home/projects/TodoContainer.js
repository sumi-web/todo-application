import React from "react";

const TodoContainer = ({ heading }) => {
	return (
		<div className="todo-container">
			<div className="todo-heading">
				<h5>{heading}</h5>
				<span>2</span>
			</div>
			<button className="add-todo-btn">+</button>

			{/* showing todo card */}
		</div>
	);
};

export default TodoContainer;
