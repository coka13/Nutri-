import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import darkModeReducer from "./slices/darkMode";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    darkMode: darkModeReducer,
  },
});
