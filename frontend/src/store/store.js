import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import folderReducer from "./folderSlice.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    folder: folderReducer,
  },
});

export default store;
