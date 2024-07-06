// shoppingListRoutes.js

import express from 'express';
import {
  getAllShoppingListsByUserController,
  getShoppingListByIdForUserController,
  createShoppingListForUserController,
  deleteShoppingListForUserController,
  updateShoppingListForUserController,
} from '../controllers/shoppingListControllers.js';

const router = express.Router();

// Routes for shopping lists
router.get('/:userId/shoppingLists', getAllShoppingListsByUserController); // Get all shopping lists for a user
router.get('/:userId/shoppingLists/:shoppingListId', getShoppingListByIdForUserController); // Get a shopping list by ID for a user
router.post('/:userId/shoppingLists', createShoppingListForUserController); // Create a new shopping list for a user
router.delete('/:userId/shoppingLists/:shoppingListId', deleteShoppingListForUserController); // Delete a shopping list by ID for a user
router.put('/:userId/shoppingLists/:shoppingListId', updateShoppingListForUserController); // Update a shopping list by ID for a user

export default router;
