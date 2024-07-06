// shoppingListController.js

import { serverResponse } from "../utils/serverResponse.js";
import { 
    getAllShoppingListsByUserService, 
    getShoppingListByIdForUserService, 
    createShoppingListForUserService, 
    deleteShoppingListForUserService, 
    updateShoppingListForUserService 
} from "../services/shoppingListServices.js";

// Controller to get all shopping lists for a user
export const getAllShoppingListsByUserController = async (req, res) => {
    try {
      const userId = req.params.userId;
      const shoppingLists = await getAllShoppingListsByUserService(userId);
      if (!shoppingLists) {
        return serverResponse(res, 200, []); // Return empty array if no lists found
      }
      serverResponse(res, 200, shoppingLists);
    } catch (error) {
      serverResponse(res, 500, { error: error.message });
    }
  };
// Controller to get a shopping list by its ID for a user
export const getShoppingListByIdForUserController = async (req, res) => {
    try {
        const userId = req.params.userId;
        const shoppingListId = req.params.shoppingListId;
        const shoppingList = await getShoppingListByIdForUserService(userId, shoppingListId);
        if (!shoppingList) {
            return serverResponse(res, 404, { message: "Shopping list not found" });
        }
        serverResponse(res, 200, shoppingList);
    } catch (error) {
        serverResponse(res, 500, { error: error.message });
    }
};

// Controller to create a new shopping list for a user
export const createShoppingListForUserController = async (req, res) => {
    console.log(req.body)
    try {
        const userId = req.params.userId;
        const newShoppingList = req.body;
        const createdShoppingList = await createShoppingListForUserService(userId, newShoppingList);
        serverResponse(res, 201, createdShoppingList);
    } catch (error) {
        serverResponse(res, 500, { error: error.message });
    }
};

// Controller to delete a shopping list by its ID for a user
export const deleteShoppingListForUserController = async (req, res) => {
    try {
        const userId = req.params.userId;
        const shoppingListId = req.params.shoppingListId;
        const deletedShoppingList = await deleteShoppingListForUserService(userId, shoppingListId);
        if (!deletedShoppingList) {
            return serverResponse(res, 404, { message: "Shopping list not found" });
        }
        serverResponse(res, 200, { message: "Shopping list deleted successfully" });
    } catch (error) {
        serverResponse(res, 500, { error: error.message });
    }
};

// Controller to update a shopping list by its ID for a user
export const updateShoppingListForUserController = async (req, res) => {
    try {
        const userId = req.params.userId;
        const shoppingListId = req.params.shoppingListId;
        const updatedShoppingList = req.body;
        const updatedList = await updateShoppingListForUserService(userId, shoppingListId, updatedShoppingList);
        if (!updatedList) {
            return serverResponse(res, 404, { message: "Shopping list not found" });
        }
        serverResponse(res, 200, updatedList);
    } catch (error) {
        serverResponse(res, 500, { error: error.message });
    }
};
