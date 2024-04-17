import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/userSlice";
import blogReducer from "../slice/blogSlice";
import commentReducer from "../slice/commentSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    blog: blogReducer,
    comment: commentReducer,
  },
});
