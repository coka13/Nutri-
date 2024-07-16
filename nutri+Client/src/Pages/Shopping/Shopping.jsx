import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./Shopping.css";
import { fetchAllRecipes } from "../store/slices/recipesSlice";

const Shopping = () => {
  const [foodName, setFoodName] = useState("");
  const [shoppingListName, setShoppingListName] = useState("");
  const [selectedFood, setSelectedFood] = useState();
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [foodList, setFoodList] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [shoppingLists, setShoppingLists] = useState([]);
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
    resetForm();
  };

  const resetForm = () => {
    setFoodName("");
    setQuantity("");
    setUnit("");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const items=[];
    selectedShoppingList.forEach((rec)=>{
      items.push(rec.ingredients)
    })

    const res=await axios.post(`http://localhost:3000/api/shopping/${userID}/shoppingLists`,{
      name:shoppingListName,
      items:items
    })
  };

  // Fetch all shopping lists for the user
  useEffect(() => {
    dispatch(fetchAllRecipes());
    const fetchShoppingLists = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/shopping/${userID}/shoppingLists`
        );
        setShoppingLists(response.data);
        console.log("Shopping lists fetched:", response.data);
      } catch (error) {
        console.error("Failed to fetch shopping lists:", error);
      }
    };
    fetchShoppingLists();
  }, [userID]);

  // Save shopping list
  const saveShoppingList = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/shopping/${userID}/shoppingLists`,
        {
          foodList: foodList,
          name: "Shopping List", // Set a default name for the shopping list
        }
      );
      console.log("Shopping list saved:", response.data);
      // Optionally update local state or reset form after saving
      setFoodList([]);
      setTotalQuantity(0);
    } catch (error) {
      console.error("Failed to save shopping list:", error);
    }
  };

  // Delete shopping list
  const deleteShoppingList = async (shoppingListId) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/shopping/${userID}/shoppingLists/${shoppingListId}`
      );
      console.log("Shopping list deleted successfully.");
      // Optionally update local state or fetch updated list after deletion
      const updatedLists = shoppingLists.filter(
        (list) => list._id !== shoppingListId
      );
      setShoppingLists(updatedLists);
      setSelectedShoppingList(""); // Clear selected shopping list after deletion
      setFoodList([]); // Clear food list when deleting a list
    } catch (error) {
      console.error("Failed to delete shopping list:", error);
    }
  };

  // Function to handle changing the selected shopping list
  const handleShoppingListChange = (event) => {
    const selectedListId = event.target.value;
    setSelectedShoppingList(selectedListId);

    // Fetch or update foodList based on selected shopping list
    const selectedList = shoppingLists.find(
      (list) => list._id === selectedListId
    );

    if (selectedList) {
      setFoodList(selectedList.foodItems); // Assuming selectedList.foodList contains items
    } else {
      setFoodList([]); // Reset foodList if selectedListId is not found
    }
  };

  const handleFoodSelection=(id)=>{
    setSelectedFood(id)
    const tempList=[...selectedShoppingList];
    tempList.push(recipes.find(recipe=>recipe._id===id))
    setSelectedShoppingList(tempList)
  }
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
                onChange={(e) => handleFoodSelection(e.target.value)}
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
                {/* <MenuItem value="piece">piece</MenuItem>
                <MenuItem value="kg">kg</MenuItem>
                <MenuItem value="liter">liter</MenuItem>
                <MenuItem value="gram">gram</MenuItem>
                <MenuItem value="milliliter">milliliter</MenuItem> */}
              </Select>
            </FormControl>
            {selectedShoppingList?.length>0 && (
          <List>
            {selectedShoppingList.map((food, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={
                    <span style={{ color: darkMode ? "#fff" : "black" }}>
                      {food.recipeName}
                    </span>
                  }
                  secondary={
                    <span style={{ color: darkMode ? "white" : "grey" }}>
                      {food.ingredients.map((ing)=>{
                        return `${ing.ingredient} ${ing.quantity} ${ing.unit}`
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
        {selectedShoppingList?.length>0 && (
          <List>
            {foodList.map((food, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={
                    <span style={{ color: darkMode ? "#fff" : "black" }}>
                      {food.foodName}
                    </span>
                  }
                  secondary={
                    <span style={{ color: darkMode ? "white" : "grey" }}>
                      {food.quantity} {food.unit}
                    </span>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
        {shoppingLists.length > 0 && (
          <FormControl fullWidth variant="outlined" margin="normal" required>
            <InputLabel id="shopping-list-label">
              Select Shopping List
            </InputLabel>
            <Select
              labelId="shopping-list-label"
              id="shoppingList"
              value={selectedShoppingList}
              onChange={handleShoppingListChange}
              label="Shopping List"
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
              {shoppingLists.map((list) => (
                <MenuItem key={list._id} value={list._id}>
                  {list.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </div>

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
        onClick={saveShoppingList}
      >
        Save Shopping List
      </Button>

      <Button
        type="button"
        variant="contained"
        color="secondary"
        sx={{
          marginTop: "10px",
          marginBottom: "10px",
          backgroundColor: "#B81D33",
          "&:hover": {
            backgroundColor: "#B81D33",
          },
        }}
        onClick={() => deleteShoppingList(selectedShoppingList)}
        disabled={!selectedShoppingList}
      >
        Delete Shopping List
      </Button>
    </div>
  );
};

export default Shopping;
