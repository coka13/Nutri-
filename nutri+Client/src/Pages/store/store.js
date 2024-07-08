import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import darkModeReducer from "./slices/darkMode";
import recipesReducer from "./slices/recipesSlice";
import mealsReducer from "./slices/mealSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    darkMode: darkModeReducer,
    recipes: recipesReducer,
    meals: mealsReducer,
  },
});
