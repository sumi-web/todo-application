import React from "react";
import TodoContainer from "./projects/TodoContainer";

const Projects = () => {
	return (
		<div className="todo-project-container">
			<div className="projects-filter-bar">
				<h2>Projects</h2>
				<div className="filter-container">
					<i class="bi bi-filter"></i>
					<h3>Filter</h3>
				</div>
			</div>

			<div className="todo-container-area">
				<TodoContainer heading="To do" />
				<TodoContainer heading="In Progress" />
				<TodoContainer heading="Completed" />
			</div>
		</div>
	);
};

export default Projects;
