import { MealModel } from "../models/mealModel.js";

export const createMeal = (meal) => MealModel.create(meal);

export const getAllMealsByUserService = (userId) => {
  return MealModel.find({ user: userId });
};

export const getMealById = (userID, mealID) =>
  MealModel.findOne({ user: userID, _id: mealID });

export const deleteMeal = (userID, mealID) =>
  MealModel.findByIdAndDelete({ user: userID, _id: mealID });
  
export const updateMeal = (userID, mealID, updatedMeal) =>
  MealModel.findByIdAndUpdate({ user: userID, _id: mealID }, updatedMeal, {
    new: true,
    useFindAndModify: false,
  });
