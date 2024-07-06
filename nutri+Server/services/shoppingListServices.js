// shoppingListService.js

import { ShoppingListModel } from "../models/shoppingListModel.js";

// Get a shopping list by ID for a user
export const getShoppingListByIdForUserService = (userId, shoppingListId) => {
    return ShoppingListModel.findOne({ _id: shoppingListId, user: userId });
};

// Insert a new shopping list for a user
export const createShoppingListForUserService = (userID,shoppingList) => {
    return ShoppingListModel.insert({
        user: userID, 
        ...shoppingList, 
    });
};

// Get shopping lists by user ID
export const getAllShoppingListsByUserService = (userId) => {
    return ShoppingListModel.find({ user: userId });
};

// Delete a shopping list by ID for a user
export const deleteShoppingListForUserService = (userId, shoppingListId) => {
    return ShoppingListModel.findByIdAndDelete(shoppingListId);
};

// Update a shopping list by ID for a user
export const updateShoppingListForUserService = (userId, shoppingListId, updatedList) => {
    return ShoppingListModel.findByIdAndUpdate(
        shoppingListId,
        updatedList,
        { new: true }
    );
};
