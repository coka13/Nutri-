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
  IconButton,
  Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addRecipe, fetchAllRecipes } from "../store/slices/recipesSlice";
import axios from "axios"; // Import Axios
import RecipeCarousel from "../../Components/RecipeCarousel/RecipeCarousel";
import "./Recipe.css";
import { useFormik, FormikProvider, Form, Field, FieldArray } from "formik";
import FormikTextField from "../../Components/Form/FormikTextField";
import FormikSelect from "../../Components/Form/FormikSelectField";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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
    recipeName: recipe?.recipeName ?? "",
    unit: recipe?.unit ?? "",
    quantity: recipe?.quantity ?? "",
    ingredients: recipe?.ingredients ?? [],
    instructions: recipe?.instructions ?? [],
    image: recipe?.image ?? "",
    description: recipe?.description ?? "",
    category: recipe?.category ?? "",
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: handleSubmit,
  });
  console.log(formik.values.ingredients);

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

  // Add instruction to list
  const handleAddInstruction = () => {
    if (instruction.trim() !== "") {
      formik.setFieldValue("instructions", [
        ...formik.values.instructions,
        instruction,
      ]);
      setInstruction("");
    }
  };

  // Form submission
  async function handleSubmit(values) {
    try {
      // Send POST request to server
      const response = await axios.put(
        `http://localhost:3000/api/recipe/recipes/${recipe._id}`,
        values
      );

      // Dispatch action to update Redux store
      dispatch(fetchAllRecipes());

      // Close the modal after submission
      setOpenModal(false);
    } catch (error) {
      console.error("Error saving recipe:", error);
      setErrorMessage("Failed to save recipe. Please try again later.");
    }
  }
  const handleIngredientUpdate = (index, ingredient) => {};
  const handleIngredientDelete = (index) => {};
  return (
    <Modal
      open={openModal}
      onClose={handleModalClose}
      aria-labelledby="recipe-details-modal"
      aria-describedby="modal-for-entering-recipe-details"
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
          <Form>
            <FormikTextField name="recipeName" label="Recipe Name" required />
            <FormikTextField name="image" label="Recipe Image URL" required />
            <FormikTextField name="description" label="Recipe Description" />
            <FormikSelect
              name="category"
              label="Category"
              options={["starter", "main course", "desert"]}
            />

            <div className="ingredient-input">
              <FieldArray name="ingredients">
                {({ push, remove }) => (
                  <>
                    {formik.values.ingredients.map((ing, index) => (
                      <Grid container spacing={2}>
                        <Grid item xs={4} key={index}>
                          <Field
                          required
                            component={TextField}
                            type="text"
                            name={`ingredients[${index}].ingredient`}
                            value={ing.ingredient}
                            onChange={(e) =>
                              formik.setFieldValue(
                                `ingredients[${index}].ingredient`,
                                e.target.value
                              )
                            }
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
                        </Grid>
                        <Grid item xs={3}>
                          <FormControl
                          required
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
                              name={`ingredients[${index}].unit`}
                              value={ing.unit}
                              onChange={(e) =>
                                formik.setFieldValue(
                                  `ingredients[${index}].unit`,
                                  e.target.value
                                )
                              }
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
                        </Grid>
                        <Grid item xs={3}>
                          <Field
                          required
                            component={TextField}
                            type="number"
                            name={`ingredients[${index}].quantity`}
                            value={ing.quantity}
                            onChange={(e) =>
                              formik.setFieldValue(
                                `ingredients[${index}].quantity`,
                                parseInt(e.target.value)
                              )
                            }
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
                        </Grid>
                        <Grid item xs={2}>
                          <IconButton onClick={() => remove(index)}>
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    ))}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        push({ ingredient: "", unit: "", quantity: "" })
                      }
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
                  </>
                )}
              </FieldArray>
            </div>
            <FieldArray name="instructions">
              {({ push, remove }) => (
                <>
                  {formik.values.instructions.map((inst, index) => (
                    <Grid container spacing={2}>
                      <Grid item xs={10} marginBottom={2}>
                        <TextField
                          required
                          type="text"
                          value={inst}
                          onChange={(e) =>
                            formik.setFieldValue(
                              `instructions[${index}]`,
                              e.target.value
                            )
                          }
                          label="Instruction"
                          name={`instructions[${index}]`}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <IconButton onClick={() => remove(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => push("")}
                    sx={{
                      marginTop: "10px",
                      marginBottom: "10px",
                      backgroundColor: "#B81D33",
                      "&:hover": {
                        backgroundColor: "#B81D33",
                      },
                    }}
                  >
                    Add Instruction
                  </Button>
                </>
              )}
            </FieldArray>

            <div>
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
                Update Recipe
              </Button>
            </div>
          </Form>
        </FormikProvider>
      </div>
    </Modal>
  );
};

export default UpdateRecipe;
