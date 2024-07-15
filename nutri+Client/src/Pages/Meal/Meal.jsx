import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardMedia,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import MealList from "../../Components/MealList/MealList";
import "./Meal.css";
import MealCarousel from "../../Components/MealCarousel/MealCarousel";
import { fetchAllRecipes } from "../store/slices/recipesSlice";
import { fetchAllMeals } from "../store/slices/mealSlice";

const Meal = () => {
  const [openModal, setOpenModal] = useState(false);
  const [foodList, setFoodList] = useState([]);
  const [selectedDish, setSelectedDish] = useState(null);
  const meals = useSelector((state) => state.meals.meals);
  const dishes = useSelector((state) => state.recipes.recipes);
  const user= useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllRecipes());
    dispatch(fetchAllMeals(user._id));
  }, []);
  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setSelectedDish(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDish) {
      alert("Please select a dish.");
      return;
    }

    // Add selected dish to foodList
    setFoodList([...foodList, selectedDish]);
    setSelectedDish(null); // Reset selectedDish
    setOpenModal(false); // Close the modal
  };

  const handleDishChange = (e) => {
    const selectedRecipe = dishes.find(
      (dish) => dish.recipeName === e.target.value
    );
    setSelectedDish(selectedRecipe);
  };

  return (
    <div className="meal-container">
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
            Add Food
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel id="food-name-label">Food Name</InputLabel>
              <Select
                labelId="food-name-label"
                value={selectedDish ? selectedDish.recipeName : ""}
                onChange={handleDishChange}
                label="Food Name"
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
                {dishes.map((dish) => (
                  <MenuItem key={dish._id} value={dish.recipeName}>
                    {dish.recipeName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {selectedDish && (
              <Card sx={{ maxWidth: 200, marginBottom: "10px" }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={selectedDish.image}
                  alt={selectedDish.recipeName}
                />
              </Card>
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
              Add Food
            </Button>
          </form>
        </div>
      </Modal>
     
      <div className="meal-list">
        <MealList setDishes={setFoodList} dishes={foodList} />
      </div>
      <MealCarousel meals={meals} />
       </div>
  );
};

export default Meal; // Export the Meal component as the default export
