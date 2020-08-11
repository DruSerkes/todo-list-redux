const todos = JSON.parse(localStorage.getItem('todos')) || [];
const INITIAL_STATE = { todos };

const rootReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'ADD_TODO':
			return { ...state, todos: [ ...state.todos, action.payload ] };
		case 'REMOVE_TODO':
			return { ...state, todos: state.todos.filter((todo) => todo.id !== action.id) };
		case 'TOGGLE_COMPLETE':
			return { ...state, todos: action.payload };
		case 'TOGGLE_EDITING':
			return { ...state, todos: action.payload };
		case 'EDIT_TODOS':
			return { ...state, todos: action.payload };
		case 'REMOVE_ALL':
			return { ...state, todos: [] };
		default:
			return state;
	}
};

export default rootReducer;
