import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    meals: []
}

const mealSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {
    setMeals: (state, action) => {
      state.meals = action.payload
    },
    addMeal: (state, action) => {
      state.meals.push(action.payload)
    },
    deleteMeal: (state, action) => {
      state.meals = state.meals.filter(meal => meal._id !== action.payload)
    },
    updateMeal: (state, action) => {
      state.meals = state.meals.map(meal => meal._id === action.payload._id ? action.payload : meal)
  },
}
});

export const {
    setMeals,
    addMeal,
    deleteMeal,
    updateMeal
} = mealSlice.actions

export default mealSlice.reducer