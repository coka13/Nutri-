import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      foodName: String,
      quantity: Number,
      unit: String,
    },
  ],
  instructions: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const RecipeModel = mongoose.model("Recipe", recipeSchema);
