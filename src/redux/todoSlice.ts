import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../models/Todo";
import { v4 as uuidv4 } from "uuid";

const getTodosFromLocalStorage = () => {
	try {
		const todoState = localStorage.getItem("todos");
		if (todoState) return JSON.parse(todoState);
	} catch (e) {
		console.log(e);
	}
};

const todosStorage = getTodosFromLocalStorage();

const todos =
	todosStorage && todosStorage.todos && todosStorage.todos.allTodos
		? todosStorage.todos.allTodos
		: [];
type initialStateType = {
	allTodos: Todo[];
};

const todoList: Todo[] = todos;
const initialState: initialStateType = { allTodos: todoList };

//const initialState = [] as Todo[];

const todoSlice = createSlice({
	name: "todos",
	initialState,
	reducers: {
		addTodo: {
			reducer: (state, action: PayloadAction<Todo>) => {
				state.allTodos.push(action.payload);
				localStorage.setItem('ToDoTask', JSON.stringify(state))
			},
			prepare: (description: string) => ({
				payload: {
					id: uuidv4(),
					description,
					completed: false,
				} as Todo,
			}),
		},
		removeTodo(state, action: PayloadAction<string>) {
			console.log("state", state)
			console.log("action", action)
			const index = state.allTodos.findIndex((todo) => todo.id === action.payload);
			state.allTodos.splice(index, 1);
		},
		removeAllTodo(state, action: PayloadAction<string>) {
			state.allTodos.length = 0;
		},
	},
});

export const { addTodo, removeTodo, removeAllTodo } = todoSlice.actions;
export default todoSlice.reducer;