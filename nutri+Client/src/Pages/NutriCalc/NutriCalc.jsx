import React, { useState } from "react";
import {
  Button,
  Modal,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useSelector } from "react-redux"; // Import useSelector for accessing Redux state
import "./NutriCalc.css";

const NutritiCalc = () => {
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState("");
  const [totalFat, setTotalFat] = useState("");
  const [protein, setProtein] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [foodList, setFoodList] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalTotalFat, setTotalTotalFat] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);

  // Access darkMode state from Redux store
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    // Reset form fields when modal is closed
    setFoodName("");
    setCalories("");
    setTotalFat("");
    setProtein("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add the entered food details to the list
    const newFoodItem = {
      foodName: foodName,
      calories: calories,
      totalFat: totalFat,
      protein: protein,
    };
    setFoodList([...foodList, newFoodItem]);
    setTotalCalories(totalCalories + parseInt(calories));
    setTotalTotalFat(totalTotalFat + parseInt(totalFat));
    setTotalProtein(totalProtein + parseInt(protein));
    // Clear form fields after adding to the list
    setFoodName("");
    setCalories("");
    setTotalFat("");
    setProtein("");
    // Close the modal after adding the item
    setOpenModal(false);
  };

  return (
    <div>
      <div className="nutri-calc">
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
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              backgroundColor: "white",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography
              variant="h6"
              component="h2"
              gutterBottom
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                fontWeight: "bold",
              }}
            >
              Enter Food Details
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                type="text"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                label="Food Name"
                fullWidth
                variant="outlined"
                margin="normal"
                required
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
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                label="Calories"
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
              />
              <TextField
                type="number"
                value={totalFat}
                onChange={(e) => setTotalFat(e.target.value)}
                label="Total Fat"
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
              />
              <TextField
                type="number"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                label="Protein"
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
              />
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

        <div style={{ marginTop: "20px" }}>
          <List>
            {foodList.map((food, index) => (
              <ListItem
                key={index}
                sx={{ color: darkMode ? "white" : "black" }}
              >
                <ListItem
                  key={index}
                  sx={{
                    color: darkMode ? "#fff" : "#333",
                  }}
                >
                  <ListItemText
                    primary={
                      <span sx={{ color: darkMode ? "#fff" : "black" }}>
                        {food.foodName}
                      </span>
                    }
                    secondary={
                      <span
                        style={{ color: darkMode ? "white" : "grey" }}
                      >{`Calories: ${food.calories}, Total Fat: ${food.totalFat}, Protein: ${food.protein}`}</span>
                    }
                  />
                </ListItem>
              </ListItem>
            ))}
          </List>
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              fontWeight: "bold",
            }}
          >
            Total
          </Typography>
          {foodList.length > 0 && (
            <Typography
              variant="body1"
              component="p"
              gutterBottom
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                color: "#B81D33",
                fontWeight: "bold",
              }}
            >
              Calories: {totalCalories}, Total Fat: {totalTotalFat}, Protein:{" "}
              {totalProtein}
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};

export default NutritiCalc;
