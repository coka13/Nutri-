// mealRoutes.js

import express from 'express';
import {
  createMealController,
  getAllMealsByUserController,
  getMealByIdController,
  deleteMealController,
  updateMealController,
} from '../controllers/mealControllers.js';

const router = express.Router();

// Routes for meals
router.post('/:userId/meals', createMealController); // Create a new meal for a user
router.get('/:userId/meals', getAllMealsByUserController); // Get all meals for a user
router.get('/:userId/meals/:mealId', getMealByIdController); // Get a meal by ID for a user
router.delete('/:userId/meals/:mealId', deleteMealController); // Delete a meal by ID for a user
router.put('/:userId/meals/:mealId', updateMealController); // Update a meal by ID for a user

export default router;
