// recipeRoutes.js

import express from 'express';
import {
  getAllRecipesByUserController,
  getRecipeByIdForUserController,
  createRecipeForUserController,
  deleteRecipeForUserController,
  updateRecipeForUserController,
} from '../controllers/recipeControllers.js';

const router = express.Router();

// Routes for recipes
router.get('/:userId/recipes', getAllRecipesByUserController); // Get all recipes for a user
router.get('/:userId/recipes/:recipeId', getRecipeByIdForUserController); // Get a recipe by ID for a user
router.post('/:userId/recipes', createRecipeForUserController); // Create a new recipe for a user
router.delete('/:userId/recipes/:recipeId', deleteRecipeForUserController); // Delete a recipe by ID for a user
router.put('/:userId/recipes/:recipeId', updateRecipeForUserController); // Update a recipe by ID for a user

export default router;
