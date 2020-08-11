import React from 'react';
import Todo from './Todo';
import NewTodoForm from './NewTodoForm';
// import EditTodoForm from './EditTodoForm';
import { v4 as uuid } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';

/**
 * TodoList - this component renders the NewTodoForm component 
 * and a list of Todo components. 
 */

const TodoList = () => {
	const todos = useSelector((state) => state.todos);
	const dispatch = useDispatch();

	const addTodo = ({ text }) => {
		if (!text) return;
		const newTodo = { text, id: uuid(), complete: false, editing: false };
		const updatedTodos = [ ...todos, newTodo ];
		updateLocalStorage(updatedTodos);
		dispatch({ type: 'ADD_TODO', payload: newTodo });
	};

	const updateLocalStorage = (updatedTodos) => {
		localStorage.setItem('todos', JSON.stringify(updatedTodos));
	};

	const removeTodo = (id) => {
		const storedTodos = JSON.parse(localStorage.getItem('todos'));
		const updatedTodos = storedTodos.filter((todo) => todo.id !== id);
		updateLocalStorage(updatedTodos);
		dispatch({ type: 'REMOVE_TODO', id });
	};

	const toggleComplete = (id) => {
		const todo = todos.find((todo) => todo.id === id);
		todo.complete = !todo.complete;
		const updatedTodos = [ ...todos ];
		setTodos((todos) => updatedTodos);
		updateLocalStorage(updatedTodos);
	};

	// const toggleEditing = (id) => {
	// 	const todo = todos.find((todo) => todo.id === id);
	// 	todo.editing = !todo.editing;
	// 	setTodos((todos) => [ ...todos ]);
	// };

	// const editTodo = ({ id, text }) => {
	// 	if (!text) return;
	// 	const todo = todos.find((todo) => todo.id === id);
	// 	todo.editing = !todo.editing;
	// 	todo.text = text;
	// 	setTodos((todos) => [ ...todos ]);
	// };

	// const checkIfEditing = (todo) => {
	// 	return todo.editing ? (
	// 		<EditTodoForm text={todo.text} id={todo.id} editTodo={editTodo} key={todo.id} />
	// 	) : (
	// 		<Todo
	// 			text={todo.text}
	// 			key={todo.id}
	// 			id={todo.id}
	// 			complete={todo.complete}
	// 			removeTodo={removeTodo}
	// 			toggleEditing={toggleEditing}
	// 			toggleComplete={toggleComplete}
	// 		/>
	// 	);
	// };

	return (
		<div className="TodoList">
			<h1 className="TodoList-Header">My Todo List</h1>
			<NewTodoForm addTodo={addTodo} />
			{/* <div className="TodoList-Container">{todos.map((todo) => checkIfEditing(todo))}</div> */}
			<div className="TodoList-Container">
				{todos.map((todo) => <Todo text={todo.text} key={todo.id} id={todo.id} removeTodo={removeTodo} />)}
			</div>
		</div>
	);
};

export default TodoList;
