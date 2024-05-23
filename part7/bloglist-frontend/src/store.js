import { createStore, combineReducers } from "redux";
import blogReducer from "./reducers/blogReducer";
import notificationReducer from "./reducers/notificationReducer";

const reducer = combineReducers({
  blogs: blogReducer,
  message: notificationReducer,
});

const store = createStore(reducer);

export default store;