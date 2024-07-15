import React, { useState } from "react";
import {
  Button,
  Modal,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  Alert,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addRecipe } from "../store/slices/recipesSlice";
import axios from "axios"; // Import Axios
import RecipeCarousel from "../../Components/RecipeCarousel/RecipeCarousel";
import "./Recipe.css";
import { useFormik, FormikProvider, Form, Field } from "formik";
import FormikTextField from "../../Components/Form/FormikTextField";
import FormikSelect from "../../Components/Form/FormikSelectField";
const UpdateRecipe = ({ recipe, openModal, setOpenModal }) => {
  // const [openModal, setOpenModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [recipeName, setRecipeName] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [unit, setUnit] = useState("");
  const [quantity, setQuantity] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instruction, setInstruction] = useState("");
  const [instructions, setInstructions] = useState([]);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(""); // Added category state
  const dispatch = useDispatch();

  const initialValues = {
    errorMessage: recipe?.errorMessage ?? "",
    recipeName: recipe?.recipeName ?? "",
    ingredient: recipe?.ingredient ?? "",
    unit: recipe?.unit ?? "",
    quantity: recipe?.quantity ?? "",
    ingredients: recipe?.ingredients ?? [],
    instruction: recipe?.instruction ?? "",
    instructions: recipe?.instructions ?? [],
    image: recipe?.image ?? "",
    description: recipe?.description ?? "",
    category: recipe?.category ?? "",
  };
  console.log(recipe, initialValues);

  const formik = useFormik({ initialValues, enableReinitialize: true });

  // Modal open and close functions
  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    resetForm();
  };

  // Form reset function
  const resetForm = () => {
    setRecipeName("");
    setIngredient("");
    setUnit("");
    setQuantity("");
    setIngredients([]);
    setInstruction("");
    setInstructions([]);
    setImage("");
    setDescription("");
    setErrorMessage("");
    setCategory("");
  };

  // Add ingredient to list
  const handleAddIngredient = () => {
    if (ingredient.trim() !== "" && unit !== "" && quantity) {
      formik.setFieldValue("ingredients",[
        ...formik.values.ingredients,
        { ingredient, unit, quantity },
      ]);
      setIngredient("");
      setUnit("");
      setQuantity("");
    }
  };

  // Add instruction to list
  const handleAddInstruction = () => {
    if (instruction.trim() !== "") {
      formik.setFieldValue("instructions",[...formik.values.instructions, instruction]);
      setInstruction("");
    }
  };

  // Form submission
  const handleSubmit = async (e) => {
    return console.log(e);
    if (
      recipeName.trim() === "" ||
      ingredients.length === 0 ||
      instructions.length === 0
    ) {
      setErrorMessage("Please fill all required details");
      return;
    }

    const newRecipe = {
      recipeName,
      ingredients,
      instructions,
      image,
      description,
      category,
    };

    try {
      // Send POST request to server
      const response = await axios.post(
        "http://localhost:3000/api/recipe/recipes",
        newRecipe
      );

      // Dispatch action to update Redux store
      dispatch(addRecipe(response.data));

      // Clear form fields after submission
      resetForm();
      // Close the modal after submission
      setOpenModal(false);
    } catch (error) {
      console.error("Error saving recipe:", error);
      setErrorMessage("Failed to save recipe. Please try again later.");
    }
  };

  return (
    <Modal
      open={openModal}
      onClose={handleModalClose}
      aria-labelledby="recipe-details-modal"
      aria-describedby="modal-for-entering-recipe-details"
      BackdropProps={{
        invisible: true,
      }}
    >
      <div className="modal-content">
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          className="modal-title"
        >
          Update Recipe Details
        </Typography>
        {errorMessage && (
          <Alert severity="error" onClose={() => setErrorMessage("")}>
            {errorMessage}
          </Alert>
        )}
        <FormikProvider value={formik}>
          <FormikTextField name="recipeName" label="Recipe Name" required />
          <FormikTextField name="image" label="Recipe Image URL" required />
          <FormikTextField name="description" label="Recipe Description" />
          <FormikSelect
            name="category"
            label="Category"
            options={["starter", "main course", "desert"]}
          />

          <div className="ingredient-input">
            <Field
              component={TextField}
              type="text"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
              label="Ingredient"
              fullWidth
              variant="outlined"
              margin="normal"
              className="input-field"
              sx={{
                marginBottom: "10px",
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "black",
                  fontWeight: "bold",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#B81D33",
                  },
                  "&:hover fieldset": {
                    borderColor: "#B81D33",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#B81D33",
                  },
                },
              }}
            />
            <FormControl
              fullWidth
              variant="outlined"
              margin="normal"
              sx={{
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "black",
                  fontWeight: "bold",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#B81D33",
                  },
                  "&:hover fieldset": {
                    borderColor: "#B81D33",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#B81D33",
                  },
                },
              }}
            >
              <InputLabel id="unit-label">Unit</InputLabel>
              <Select
                labelId="unit-label"
                id="unit"
                label="Unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                sx={{
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "black",
                    fontWeight: "bold",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#B81D33",
                    },
                    "&:hover fieldset": {
                      borderColor: "#B81D33",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#B81D33",
                    },
                  },
                }}
              >
                <MenuItem value="piece(s)">piece(s)</MenuItem>
                <MenuItem value="g">g</MenuItem>
                <MenuItem value="kg">kg</MenuItem>
                <MenuItem value="ml">ml</MenuItem>
                <MenuItem value="l">l</MenuItem>
                <MenuItem value="pcs">pcs</MenuItem>
                <MenuItem value="tsp">tsp</MenuItem>
                <MenuItem value="tbsp">tbsp</MenuItem>
                <MenuItem value="cup">cup</MenuItem>
              </Select>
            </FormControl>
            <Field
              component={TextField}
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              label="Quantity"
              fullWidth
              variant="outlined"
              margin="normal"
              className="input-field"
              sx={{
                marginBottom: "10px",
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "black",
                  fontWeight: "bold",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#B81D33",
                  },
                  "&:hover fieldset": {
                    borderColor: "#B81D33",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#B81D33",
                  },
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddIngredient}
              sx={{
                marginBottom: "10px",
                marginTop: "20px",
                backgroundColor: "#B81D33",
                "&:hover": {
                  backgroundColor: "#B81D33",
                },
              }}
            >
              Add Ingredient
            </Button>
          </div>

          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {formik.values.ingredients?.map((ingredient, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`${ingredient.ingredient}, ${ingredient.quantity} ${ingredient.unit}`}
                />
              </ListItem>
            ))}
          </List>

          <TextField
            type="text"
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            label="Instruction"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddInstruction}
            sx={{
              marginBottom: "10px",
              backgroundColor: "#B81D33",
              "&:hover": {
                backgroundColor: "#B81D33",
              },
            }}
          >
            Add Instruction
          </Button>

          {/* Display added instructions */}
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {formik.values.instructions?.map((instruction, index) => (
              <ListItem key={index}>
                <ListItemText primary={`${index + 1}. ${instruction}`} />
              </ListItem>
            ))}
          </List>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              marginTop: "10px",
              backgroundColor: "#B81D33",
              "&:hover": {
                backgroundColor: "#B81D33",
              },
            }}
          >
            Save Recipe
          </Button>
        </FormikProvider>
      </div>
    </Modal>
  );
};

export default UpdateRecipe;
