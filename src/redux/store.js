const { configureStore } = require("@reduxjs/toolkit");
const { combineReducers } = require("redux");
const { default: rootSlice } = require("./rootSlice");

const reducer = combineReducers({
    root: rootSlice,
});

const store = configureStore({
    reducer,
});

export default store;