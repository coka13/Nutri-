import React, { useState, useEffect,useMemo } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import {
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
} from "@mui/material";

export default function ShoppingsList({ items }) {
  const [fetchedRecipes, setFetchedRecipes] = useState([]);
  const [error, setErrorMessage] = useState("");


  return (
    <div>
      {/* Ingredients List */}
      {items.length > 0 && (
        <>
          <Typography variant="h6" component="h2" gutterBottom>
            Ingredients
          </Typography>
          <List sx={{ width: "100%",  }}>
            {items.map((ingredient, index) => (
              <React.Fragment key={ingredient._id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt={ingredient.ingredient} src={ingredient?.image} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={ingredient.ingredient}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {ingredient.quanitity} {ingredient.unit}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                {index < ingredient.length - 1 && (
                  <Divider variant="inset" component="li" />
                )}
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
