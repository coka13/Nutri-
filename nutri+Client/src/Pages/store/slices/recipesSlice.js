import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  recipes: []
}
export const fetchAllRecipes = createAsyncThunk(
  'recipes/fetch',
  async (thunkAPI) => {
    const response = await fetch("http://localhost:3000/api/recipe/recipes");
    const data = await response.json();
    return data;
  }
);
const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setRecipes: (state, action) => {
      state.recipes = action.payload
    },
    addRecipe: (state, action) => {
      state.recipes.push(action.payload)
    },
    deleteRecipe: (state, action) => {
      state.recipes = state.recipes.filter(recipe => recipe._id !== action.payload)
    },
    updateRecipe: (state, action) => {
      state.recipes = state.recipes.map(recipe => recipe._id === action.payload._id ? action.payload : recipe)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRecipes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
      })
      .addCase(fetchAllRecipes.rejected, (state, action) => {
        state.recipes = 'failed';
        state.loading = false;
      });
  },
});




export const {
  setRecipes,
  addRecipe,
  deleteRecipe,
  updateRecipe
} = recipesSlice.actions

export default recipesSlice.reducer