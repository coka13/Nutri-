import React, { useState } from 'react';
import { Button, Modal, TextField, Typography, List, ListItem, ListItemText, IconButton, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import "./Recipe.css";

const Recipe = () => {
  const [recipeName, setRecipeName] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [instruction, setInstruction] = useState('');
  const [instructions, setInstructions] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    // Reset form fields when modal is closed
    setRecipeName('');
    setIngredient('');
    setIngredients([]);
    setInstruction('');
    setInstructions([]);
    setErrorMessage(''); // Clear error message when modal is closed
  };

  const handleAddIngredient = () => {
    if (ingredient.trim() !== "") {
      setIngredients([...ingredients, ingredient]);
      setIngredient('');
    }
  };

  const handleAddInstruction = () => {
    if (instruction.trim() !== "") {
      setInstructions([...instructions, instruction]);
      setInstruction('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (recipeName.trim() === "" || ingredients.length === 0 || instructions.length === 0) {
      setErrorMessage("Please fill all required details");
      return;
    }
    // Add the entered recipe details to the list
    const newRecipe = {
      recipeName: recipeName,
      ingredients: ingredients,
      instructions: instructions,
    };
    setRecipeList([...recipeList, newRecipe]);
    // Clear form fields after adding to the list
    setRecipeName('');
    setIngredient('');
    setIngredients([]);
    setInstruction('');
    setInstructions([]);
    // Close the modal after adding the item
    setOpenModal(false);
  };

  return (
    <div className="recipe-container">
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
        Add Recipe
      </Button>

      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="recipe-details-modal"
        aria-describedby="modal-for-entering-recipe-details"
        BackdropProps={{
          invisible: true, // Hides the backdrop
        }}
      >
        <div className="modal-content">
          <Typography variant="h6" component="h2" gutterBottom className="modal-title">
            Enter Recipe Details
          </Typography>
          {errorMessage && (
            <Alert severity="error" onClose={() => setErrorMessage('')}>{errorMessage}</Alert>
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
              <IconButton color="primary" onClick={handleAddIngredient} sx={{ backgroundColor: "#B81D33", color: "white", "&:hover": { backgroundColor: "#B81D33" } }}>
                <AddIcon />
              </IconButton>
            </div>
            <List>
              {ingredients.map((ingredient, index) => (
                <ListItem key={index}>
                  <ListItemText primary={ingredient} />
                </ListItem>
              ))}
            </List>
            <div className="instruction-input">
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
              <IconButton color="primary" onClick={handleAddInstruction} sx={{ backgroundColor: "#B81D33", color: "white", "&:hover": { backgroundColor: "#B81D33" } }}>
                <AddIcon />
              </IconButton>
            </div>
            <List>
              {instructions.map((instruction, index) => (
                <ListItem key={index}>
                  <ListItemText primary={instruction} />
                </ListItem>
              ))}
            </List>
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
              Add Recipe
            </Button>
          </form>
        </div>
      </Modal>

      <div className="recipe-list">
        <List>
          {recipeList.map((recipe, index) => (
            <ListItem key={index} className="recipe-list-item">
              <ListItemText
                primary={recipe.recipeName}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="textPrimary">
                      Ingredients:
                    </Typography>
                    <ul>
                      {recipe.ingredients.map((ingredient, i) => (
                        <li key={i}>{ingredient}</li>
                      ))}
                    </ul>
                    <Typography component="span" variant="body2" color="textPrimary">
                      Instructions:
                    </Typography>
                    <ul>
                      {recipe.instructions.map((instruction, i) => (
                        <li key={i}>{instruction}</li>
                      ))}
                    </ul>
                  </>
                }
              />
              <div>
                <FacebookShareButton
                  url={`https://6560-2a00-a040-192-6b63-81d6-6275-83d7-b9f4.ngrok-free.app/recipe/${encodeURIComponent(recipe.recipeName)}`}
                  quote={`Check out this recipe: ${recipe.recipeName}`}
                  hashtag="#myrecipe"
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
              </div>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default Recipe;
