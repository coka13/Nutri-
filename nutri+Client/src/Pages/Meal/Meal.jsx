import React, { useState } from 'react';
import { Button, Modal, TextField, Typography, List, ListItem, ListItemText } from '@mui/material';


const Meal = () => {
  const [foodName, setFoodName] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [foodList, setFoodList] = useState([]);

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    // Reset form fields when modal is closed
    setFoodName('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add the entered food details to the list
    const newFoodItem = {
      foodName: foodName,
    };
    setFoodList([...foodList, newFoodItem]);
    // Clear form fields after adding to the list
    setFoodName('');
    // Close the modal after adding the item
    setOpenModal(false);
  };

  return (
    <div className="shopping-container">
      <Button
        type="button"
        variant="contained"
        color="primary"
        sx={{
          marginTop: '10px',
          marginBottom: '10px',
          backgroundColor: '#B81D33',
          '&:hover': {
            backgroundColor: '#B81D33',
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
          <Typography variant="h6" component="h2" gutterBottom className="modal-title">
            Enter Food Name
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
                marginBottom: '10px',
                '& .MuiInputLabel-root.Mui-focused': {
                  color: 'black',
                  fontWeight: 'bold',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#B81D33',
                  },
                  '&:hover fieldset': {
                    borderColor: '#B81D33',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#B81D33',
                  },
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                marginTop: '10px',
                marginBottom: '10px',
                backgroundColor: '#B81D33',
                '&:hover': {
                  backgroundColor: '#B81D33',
                },
              }}
            >
              Add Food
            </Button>
          </form>
        </div>
      </Modal>

      <div className="shopping-list">
        <List>
          {foodList.map((food, index) => (
            <ListItem key={index}>
              <ListItemText primary={food.foodName} />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default Meal;
