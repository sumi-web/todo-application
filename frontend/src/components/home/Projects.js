import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import TodoContainer from "./projects/TodoContainer";

import { GetAllTodo, MoveSelectedTodoCard } from "../../action/action-todo";

const Projects = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(GetAllTodo());
	}, [dispatch]);

	const { todoData, progressData, completedData } = useSelector((state) => ({
		todoData: state.todo_store.todo,
		progressData: state.todo_store.progress,
		completedData: state.todo_store.completed,
	}));

	const dragEnd = (result) => {
		console.log("check on drag end", result);
		const { destination, draggableId, source } = result;

		if (destination && source) {
			const destinationArr = Object.keys(destination);
			if (!destinationArr.every((key) => source[key] === destination[key])) {
				console.log("cam here");
				dispatch(MoveSelectedTodoCard(draggableId, source, destination));
			}
		}
	};

	return (
		<DragDropContext onDragEnd={dragEnd}>
			<div className="todo-container-area">
				<Droppable droppableId="todo">
					{(provided, snapshot) => (
						<div className={`todo-container ${snapshot.isDraggingOver ? "dragover" : ""}`} ref={provided.innerRef} {...provided.droppableProps}>
							<TodoContainer heading={todoData.heading} todoData={todoData.list} />
							{provided.placeholder}
						</div>
					)}
				</Droppable>
				<Droppable droppableId="progress">
					{(provided, snapshot) => (
						<div className={`todo-container ${snapshot.isDraggingOver ? "dragover" : ""}`} ref={provided.innerRef} {...provided.droppableProps}>
							<TodoContainer heading={progressData.heading} todoData={progressData.list} />
							{provided.placeholder}
						</div>
					)}
				</Droppable>
				<Droppable droppableId="completed">
					{(provided, snapshot) => (
						<div className={`todo-container ${snapshot.isDraggingOver ? "dragover" : ""}`} ref={provided.innerRef} {...provided.droppableProps}>
							<TodoContainer heading={completedData.heading} todoData={completedData.list} />
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</div>
		</DragDropContext>
	);
};

export default Projects;
