import mongoose from "mongoose";

const shoppingListSchema = new mongoose.Schema({
  foodName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
    enum: ['piece', 'kg', 'liter', 'gram', 'milliliter'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const ShoppingListModel = mongoose.model("ShoppingList", shoppingListSchema);
