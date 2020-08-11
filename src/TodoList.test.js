import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import TodoList from './TodoList';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './rootReducer';

const store = createStore(rootReducer);

// Smoke test
it('renders without crashing', () => {
	render(
		<Provider store={store}>
			<TodoList />
		</Provider>
	);
});

// Snapshot test
it('matches snapshot', () => {
	const { asFragment } = render(
		<Provider store={store}>
			<TodoList />
		</Provider>
	);
	expect(asFragment()).toMatchSnapshot();
});

describe('TodoList tests', () => {
	afterAll(() => {
		cleanup();
		localStorage.clear();
	});

	it('should add new todo', () => {
		const { queryByText, getByPlaceholderText } = render(
			<Provider store={store}>
				<TodoList />
			</Provider>
		);
		expect(queryByText('breakfast')).not.toBeInTheDocument();

		const input = getByPlaceholderText('Breakfast...', { exact: false });
		const btn = queryByText('Add');
		fireEvent.change(input, { target: { value: 'breakfast' } });
		fireEvent.click(btn);
		expect(queryByText('breakfast')).toBeInTheDocument();
	});

	it('should remove a todo', () => {
		const { queryByText, getByPlaceholderText } = render(
			<Provider store={store}>
				<TodoList />
			</Provider>
		);

		expect(queryByText('breakfast')).toBeInTheDocument();
		const removeBtn = queryByText('ⅹ');
		fireEvent.click(removeBtn);
		expect(queryByText('breakfast')).not.toBeInTheDocument();
	});
});
