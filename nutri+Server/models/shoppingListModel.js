import mongoose from "mongoose";


const shoppingListSchema = new mongoose.Schema({
  foodItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "FoodItem",
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

export const ShoppingListModel = mongoose.model("ShoppingList", shoppingListSchema);
