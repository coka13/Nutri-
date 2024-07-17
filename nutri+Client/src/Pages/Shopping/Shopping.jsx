import {
  Button,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCarousel from "../../Components/ShoppingCarousel/ShoppingCarousel";
import { fetchAllRecipes } from "../store/slices/recipesSlice";
import { fetchAllShoppingLists } from "../store/slices/shoppingSlice";
import "./Shopping.css";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

const Shopping = () => {
  const [shoppingListName, setShoppingListName] = useState("");
  const [selectedFood, setSelectedFood] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [selectedShoppingList, setSelectedShoppingList] = useState([]);
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const userID = useSelector((state) => state.auth.user._id);
  const recipes = useSelector((state) => state.recipes.recipes);

  const dispatch = useDispatch();
  // Modal handlers
  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const items = [];
      selectedShoppingList.forEach((rec) => {
        items.push(rec.ingredients);
      });

      const res = await axios.post(
        `http://localhost:3000/api/shopping/${userID}/shoppingLists`,
        {
          name: shoppingListName,
          items: items.flat(),
        }
      );
      handleModalClose();
      dispatch(fetchAllShoppingLists());
    } catch (err) {
      console.error("Failed to create shopping list:", err);
    }
  };

  // Fetch all shopping lists for the user
  useEffect(() => {
    dispatch(fetchAllRecipes());
    dispatch(fetchAllShoppingLists());
  }, []);

  const handleFoodSelection = () => {
    const tempList = [...selectedShoppingList];
    tempList.push(recipes.find((recipe) => recipe._id === selectedFood));
    setSelectedShoppingList(tempList);
  };

  const handleFoodRemove = (index) => {
    const tempList = [...selectedShoppingList];
    tempList.splice(index, 1);
    setSelectedShoppingList(tempList);
  };

  return (
    <div className="shopping-container">
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
        Add Food
      </Button>

      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="food-details-modal"
        aria-describedby="modal-for-entering-food-details"
        BackdropProps={{
          invisible: true, // Hides the backdrop
        }}
      >
        <div className="modal-content">
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            className="modal-title"
          >
            Enter Food Details
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              required
              type="text"
              value={shoppingListName}
              onChange={(e) => setShoppingListName(e.target.value)}
              label="Shooping List Name"
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
            <div style={{ display: "flex", alignItems: "center" }}>
              <FormControl
                fullWidth
                variant="outlined"
                margin="normal"
                required
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
                <InputLabel id="unit-label">Select Food</InputLabel>
                <Select
                  labelId="unit-label"
                  id="unit"
                  label="Select Food"
                  value={selectedFood}
                  onChange={(e) => setSelectedFood(e.target.value)}
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
                  {recipes?.length > 0 &&
                    recipes.map((r) => {
                      return <MenuItem value={r._id}>{r.recipeName}</MenuItem>;
                    })}
                </Select>
              </FormControl>
              <AddIcon fontSize="large" onClick={handleFoodSelection} />
            </div>
            {selectedShoppingList?.length > 0 && (
              <List>
                {selectedShoppingList.map((food, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <span style={{ color: darkMode ? "#fff" : "black" }}>
                            {food.recipeName}
                          </span>
                          <CloseIcon onClick={() => handleFoodRemove(index)} />
                        </div>
                      }
                      secondary={
                        <span style={{ color: darkMode ? "white" : "grey" }}>
                          {food.ingredients.map((ing) => {
                            return `${ing.ingredient} ${ing.quantity} ${ing.unit}`;
                          })}
                        </span>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            )}

            <Button
              type="submit"
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
            >
              Add to Shopping List
            </Button>
          </form>
        </div>
      </Modal>

      <div className="shopping-list">
        <ShoppingCarousel />
      </div>
    </div>
  );
};

export default Shopping;
