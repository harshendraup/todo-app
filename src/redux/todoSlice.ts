import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../models/Todo";
import { v4 as uuidv4 } from "uuid";

const initialState = [] as Todo[];

const todoSlice = createSlice({
	name: "todos",
	initialState,
	reducers: {
		addTodo: {
			reducer: (state, action: PayloadAction<Todo>) => {
				state.push(action.payload);
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
			const index = state.findIndex((todo) => todo.id === action.payload);
			state.splice(index, 1);
		},
		removeAllTodo(state, action: PayloadAction<string>) {
			state.length = 0;
			localStorage.setItem('ToDoTask', JSON.stringify([]))

		},
		setTodoStatus(
			state,
			action: PayloadAction<{ completed: boolean; id: string }>
		) {
			const index = state.findIndex((todo) => todo.id === action.payload.id);
			state[index].completed = action.payload.completed;
		},
	},
});

export const { addTodo, removeTodo, setTodoStatus, removeAllTodo } = todoSlice.actions;
export default todoSlice.reducer;