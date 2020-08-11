const todos = JSON.parse(localStorage.getItem('todos')) || [];
const INITIAL_STATE = { todos };

const rootReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'ADD_TODO':
			return { ...state, todos: [ ...state.todos, action.payload ] };
		case 'REMOVE_TODO':
			return { ...state, todos: state.todos.filter((todo) => todo.id !== action.id) };
		case 'TOGGLE_COMPLETE':
			console.log('payload is ', action.payload);
			return { ...state, todos: action.payload };
		case 'TOGGLE_EDITING':
			console.log('payload is ', action.payload);
			return { ...state, todos: action.payload };
		case 'EDIT_TODOS':
			console.log('payload is ', action.payload);
			return { ...state, todos: action.payload };
		default:
			return state;
	}
};

export default rootReducer;
