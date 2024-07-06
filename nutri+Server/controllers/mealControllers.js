// mealController.js

import { serverResponse } from "../utils/serverResponse.js";
import {
  createMeal,
  getAllMealsByUserService,
  getMealById,
  deleteMeal,
  updateMeal,
} from "../services/mealServices.js";

// Controller to create a new meal
export const createMealController = (req, res) => {
  const mealData = req.body;
  createMeal(mealData)
    .then((createdMeal) => serverResponse(res, 201, createdMeal))
    .catch((error) => serverResponse(res, 500, { error: error.message }));
};

// Controller to get all meals for a user
export const getAllMealsByUserController = (req, res) => {
  const userId = req.params.userId;
  getAllMealsByUserService(userId)
    .then((meals) => serverResponse(res, 200, meals))
    .catch((error) => serverResponse(res, 500, { error: error.message }));
};

// Controller to get a meal by ID for a user
export const getMealByIdController = (req, res) => {
  const userId = req.params.userId;
  const mealId = req.params.mealId;
  getMealById(userId, mealId)
    .then((meal) => {
      if (!meal) {
        return serverResponse(res, 404, { message: "Meal not found" });
      }
      serverResponse(res, 200, meal);
    })
    .catch((error) => serverResponse(res, 500, { error: error.message }));
};

// Controller to delete a meal by ID for a user
export const deleteMealController = (req, res) => {
  const userId = req.params.userId;
  const mealId = req.params.mealId;
  deleteMeal(userId, mealId)
    .then((deletedMeal) => {
      if (!deletedMeal) {
        return serverResponse(res, 404, { message: "Meal not found" });
      }
      serverResponse(res, 200, { message: "Meal deleted successfully" });
    })
    .catch((error) => serverResponse(res, 500, { error: error.message }));
};

// Controller to update a meal by ID for a user
export const updateMealController = (req, res) => {
  const userId = req.params.userId;
  const mealId = req.params.mealId;
  const updatedData = req.body;
  updateMeal(userId, mealId, updatedData)
    .then((updatedMeal) => {
      if (!updatedMeal) {
        return serverResponse(res, 404, { message: "Meal not found" });
      }
      serverResponse(res, 200, updatedMeal);
    })
    .catch((error) => serverResponse(res, 500, { error: error.message }));
};
