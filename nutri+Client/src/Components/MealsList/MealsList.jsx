import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import { Alert, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider } from '@mui/material';

export default function MealsList({ dishes }) {
  const [error, setErrorMessage] = useState('');
  

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    const recipeIds = dishes.map(recipe => recipe._id);
    try {
      const response = await axios.get('http://localhost:3000/api/recipe/recipes', {
        params: {
          ids: recipeIds,
        },
      });
      console.log('Recipes:', response.data);
      setRecipes(response.data);
    } catch (error) {
      console.error('Get recipes failed:', error);
      setErrorMessage('Failed to fetch recipes.');
    }
  };

  if (!dishes || !Array.isArray(dishes)) {
    return null; // Handle case where dishes is not defined or not an array
  }

  // Separate dishes by category
  const starters = dishes.filter(dish => dish.category === 'starter');
  const mainCourse = dishes.filter(dish => dish.category === 'main course');
  const dessert = dishes.filter(dish => dish.category === 'dessert');

  return (
    <div>
      {/* Starters List */}
      {starters.length > 0 && (
        <>
          <Typography variant="h6" component="h2" gutterBottom>
            Starters
          </Typography>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {starters.map((dish, index) => (
              <React.Fragment key={dish._id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt={dish.recipeName} src={dish.image} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={dish.recipeName}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {dish.description}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                {index < starters.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
          </List>
        </>
      )}

      {/* Main Course List */}
      {mainCourse.length > 0 && (
        <>
          <Typography variant="h6" component="h2" gutterBottom>
            Main Course
          </Typography>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {mainCourse.map((dish, index) => (
              <React.Fragment key={dish._id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt={dish.recipeName} src={dish.image} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={dish.recipeName}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {dish.description}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                {index < mainCourse.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
          </List>
        </>
      )}

      {/* Dessert List */}
      {dessert.length > 0 && (
        <>
          <Typography variant="h6" component="h2" gutterBottom>
            Dessert
          </Typography>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {dessert.map((dish, index) => (
              <React.Fragment key={dish._id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt={dish.recipeName} src={dish.image} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={dish.recipeName}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {dish.description}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                {index < dessert.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
          </List>
        </>
      )}

      {error && (
        <Alert severity="error" onClose={() => setErrorMessage("")}>
          {error}
        </Alert>
      )}
    </div>
  );
}
