const INITIAL_STATE = { todos: [] };

const rootReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'ADD_TODO':
			return { ...state, todos: [ ...state.todos, action.payload ] };
		case 'REMOVE_TODO':
			return { ...state, todos: state.todos.filter((todo) => todo.id !== action.id) };
		default:
			return state;
	}
};

export default rootReducer;
