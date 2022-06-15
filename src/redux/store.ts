import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todoSlice";


export const store = configureStore({
	reducer: { todos: todosReducer },
});

store.subscribe(() => {
	localStorage.setItem('todos', JSON.stringify(store.getState()))
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;