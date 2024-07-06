// recipeService.js

import { RecipeModel } from "../models/recipeModel.js";

// Get all recipes for a user
export const getAllRecipesByUserService = (userId) => {
    return RecipeModel.find({ user: userId });
};

// Get a recipe by ID for a user
export const getRecipeByIdForUserService = (userId, recipeId) => {
    return RecipeModel.findOne({ _id: recipeId, user: userId });
};

// Create a new recipe for a user
export const createRecipeForUserService = (recipe) => {
    return RecipeModel.create(recipe);
};

// Delete a recipe by ID for a user
export const deleteRecipeForUserService = (userId, recipeId) => {
    return RecipeModel.findOneAndDelete({ _id: recipeId, user: userId });
};

// Update a recipe by ID for a user
export const updateRecipeForUserService = (userId, recipeId, updatedRecipe) => {
    return RecipeModel.findOneAndUpdate(
        { _id: recipeId, user: userId },
        updatedRecipe,
        { new: true, useFindAndModify: false }
    );
};
