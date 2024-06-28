import {
	combineReducers,
	configureStore,
	type Reducer,
} from "@reduxjs/toolkit";

const exampleReducer = ((_initial = null, _action) => null) satisfies Reducer;

const store = configureStore({
	reducer: combineReducers({
		example: exampleReducer,
	}),
});
export default store;
