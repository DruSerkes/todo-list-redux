import React from 'react';
import './Todo.css';

/**
 * returns a div with the todo text, an edit and remove button  
 */

const Todo = ({ id, text, complete, removeTodo, toggleEditing, toggleComplete }) => {
	const handleRemove = (e) => {
		removeTodo(id);
	};
	const handleEdit = (e) => {
		// const { id } = e.target.parentElement;
		toggleEditing(id);
	};

	const handleComplete = (e) => {
		toggleComplete(id);
	};
	return (
		<div key={id} id={id} className="Todo">
			{/* <span className="Todo-Text">{text}</span> */}
			<span onClick={handleComplete} className={`Todo-Text ${complete ? 'complete' : ''}`}>
				{text}
			</span>
			<button className="Todo-Edit" onClick={handleEdit}>
				Edit
			</button>
			<button className="Todo-Remove" onClick={handleRemove}>
				ⅹ
			</button>
		</div>
	);
};

export default Todo;
