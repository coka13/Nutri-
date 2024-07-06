// recipeController.js

import { serverResponse } from "../utils/serverResponse.js";
import {
  getAllRecipesByUserService,
  getRecipeByIdForUserService,
  createRecipeForUserService,
  deleteRecipeForUserService,
  updateRecipeForUserService,
} from "../services/recipeServices.js";

// Controller to get all recipes for a user
export const getAllRecipesByUserController = (req, res) => {
  const userId = req.params.userId;
  getAllRecipesByUserService(userId)
    .then((recipes) => serverResponse(res, 200, recipes))
    .catch((error) => serverResponse(res, 500, { error: error.message }));
};

// Controller to get a recipe by ID for a user
export const getRecipeByIdForUserController = (req, res) => {
  const userId = req.params.userId;
  const recipeId = req.params.recipeId;
  getRecipeByIdForUserService(userId, recipeId)
    .then((recipe) => {
      if (!recipe) {
        return serverResponse(res, 404, { message: "Recipe not found" });
      }
      serverResponse(res, 200, recipe);
    })
    .catch((error) => serverResponse(res, 500, { error: error.message }));
};

// Controller to create a new recipe for a user
export const createRecipeForUserController = (req, res) => {
  const recipeData = req.body;
  createRecipeForUserService(recipeData)
    .then((createdRecipe) => serverResponse(res, 201, createdRecipe))
    .catch((error) => serverResponse(res, 500, { error: error.message }));
};

// Controller to delete a recipe by ID for a user
export const deleteRecipeForUserController = (req, res) => {
  const userId = req.params.userId;
  const recipeId = req.params.recipeId;
  deleteRecipeForUserService(userId, recipeId)
    .then((deletedRecipe) => {
      if (!deletedRecipe) {
        return serverResponse(res, 404, { message: "Recipe not found" });
      }
      serverResponse(res, 200, { message: "Recipe deleted successfully" });
    })
    .catch((error) => serverResponse(res, 500, { error: error.message }));
};

// Controller to update a recipe by ID for a user
export const updateRecipeForUserController = (req, res) => {
  const userId = req.params.userId;
  const recipeId = req.params.recipeId;
  const updatedData = req.body;
  updateRecipeForUserService(userId, recipeId, updatedData)
    .then((updatedRecipe) => {
      if (!updatedRecipe) {
        return serverResponse(res, 404, { message: "Recipe not found" });
      }
      serverResponse(res, 200, updatedRecipe);
    })
    .catch((error) => serverResponse(res, 500, { error: error.message }));
};
