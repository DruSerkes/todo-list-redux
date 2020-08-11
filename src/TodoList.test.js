import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';

// Smoke test
it('renders without crashing', () => {
	render(<TodoList />);
});

// Snapshot test
it('matches snapshot', () => {
	const { asFragment } = render(<TodoList />);
	expect(asFragment()).toMatchSnapshot();
});

describe('TodoList tests', () => {
	afterEach(() => {
		localStorage.clear();
	});

	it('should add new todo', () => {
		const { queryByText, getByPlaceholderText } = render(<TodoList />);
		expect(queryByText('breakfast')).not.toBeInTheDocument();

		const input = getByPlaceholderText('Breakfast...', { exact: false });
		const btn = queryByText('Add');
		fireEvent.change(input, { target: { value: 'breakfast' } });
		fireEvent.click(btn);
		expect(queryByText('breakfast')).toBeInTheDocument();
	});

	it('should remove a todo', () => {
		const { queryByText, getByPlaceholderText } = render(<TodoList />);
		const input = getByPlaceholderText('Breakfast...', { exact: false });
		const btn = queryByText('Add');
		fireEvent.change(input, { target: { value: 'test' } });
		fireEvent.click(btn);

		expect(queryByText('test')).toBeInTheDocument();
		const removeBtn = queryByText('ⅹ');
		fireEvent.click(removeBtn);
		expect(queryByText('test')).not.toBeInTheDocument();
	});
});
