import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./auth-reducer";
import { todoReducer } from "./todo-reducer";

const reducers = combineReducers({
	auth_store: authReducer,
	todo_store: todoReducer,
});

export const store = createStore(reducers, applyMiddleware(thunk));
