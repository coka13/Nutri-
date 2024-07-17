import React, { useState, useEffect, useMemo } from "react";
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

export default function NutritionsList({ item }) {
  const [error, setErrorMessage] = useState("");

  return (
    <div>
      <>
        <Typography variant="h6" component="h2" gutterBottom>
          Nutritional Facts
        </Typography>
        <List sx={{ width: "100%" }}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText
              primary={"Fats"}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {item.fat}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText
              primary={"Protein"}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {item.protein}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText
              primary={"Calories"}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {item.calories}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
      </>

      {error && (
        <Alert severity="error" onClose={() => setErrorMessage("")}>
          {error}
        </Alert>
      )}
    </div>
  );
}
