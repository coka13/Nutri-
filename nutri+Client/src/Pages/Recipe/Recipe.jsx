import React, { useState, useEffect } from "react";
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
import { addRecipe, fetchAllRecipes } from "../store/slices/recipesSlice";
import axios from "axios"; // Import Axios
import RecipeCarousel from "../../Components/RecipeCarousel/RecipeCarousel";
import "./Recipe.css";


const Recipe = () => {
  const [openModal, setOpenModal] = useState(false);
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

  useEffect(()=>{
    dispatch(fetchAllRecipes())
  },[])

  const recipes = useSelector((state) => state.recipes.recipes); // Redux state
  console.log(recipes)

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
      setIngredients([...ingredients, { ingredient, unit, quantity }]);
      setIngredient("");
      setUnit("");
      setQuantity("");
    }
  };

  // Add instruction to list
  const handleAddInstruction = () => {
    if (instruction.trim() !== "") {
      setInstructions([...instructions, instruction]);
      setInstruction("");
    }
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
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
      category
    };

    try {
      // Send POST request to server
      const response = await axios.post("http://localhost:3000/api/recipe/recipes", newRecipe);
     
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
    <div className="recipe-container">
      <Button
        type="button"
        variant="contained"
        color="primary"
        sx={{
          marginTop: "10px",
          marginBottom: "10px",
          backgroundColor: "#B81D33",
          "&:hover": {
            backgroundColor: "#B81D33",
          },
        }}
        onClick={handleModalOpen}
      >
        Add Recipe
      </Button>

      {/* Modal for entering recipe details */}
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
            Enter Recipe Details
          </Typography>
          {errorMessage && (
            <Alert severity="error" onClose={() => setErrorMessage("")}>
              {errorMessage}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              type="text"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
              label="Recipe Name"
              fullWidth
              variant="outlined"
              margin="normal"
              required
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
            <TextField
              type="text"
              onChange={(e) => setImage(e.target.value)}
              label="Recipe Image URL"
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
            <TextField
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              label="Recipe Description"
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
                <InputLabel id="unit-label">Category</InputLabel>
                <Select
                required
                  labelId="categort-label"
                  id="category"
                  label="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
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
                  <MenuItem value="starter">starter</MenuItem>
                  <MenuItem value="main course">main course</MenuItem>
                  <MenuItem value="dessert">dessert</MenuItem>
       
                </Select>
              </FormControl>







            <div className="ingredient-input">
              <TextField
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
              <TextField
                value={quantity}
                type="number"
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
              sx={{ width: "100%", maxWidth: 360,  }}
            >
              {ingredients.map((ingredient, index) => (
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
              sx={{ width: "100%", maxWidth: 360,  }}
            >
              {instructions.map((instruction, index) => (
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
          </form>
        </div>
      </Modal>

      <div>
<div className="recipe-carousel">
      {recipes.length>0 && (
    <RecipeCarousel recipes ={recipes} />
   
  )}
 </div>

</div>
    </div>
  );
};

export default Recipe;
