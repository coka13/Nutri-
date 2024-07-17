import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import ShoppingCard from "../ShoppingCard/ShoppingCard";
import { useSelector } from "react-redux";
import NutritionCard from "../NutritionCard/NutritionCard";
import { Card, CardContent, Chip, Grid, Typography } from "@mui/material";

export function NutritionCarousel() {
  const nutrition = useSelector((state) => state.nutrition.nutrition);
  const totals = nutrition.reduce(
    (acc, item) => ({
      totalFats: acc.totalFats + Number(item.fat),
      totalProtein: acc.totalProtein + Number(item.protein),
      totalCalories: acc.totalCalories + Number(item.calories),
    }),
    { totalFats: 0, totalProtein: 0, totalCalories: 0 }
  );
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => {
    setActiveStep(0);
  }, [nutrition]);
  const maxSteps = nutrition.length; // Corrected to use nutrition.length instead of recipes.length

  const handleNext = () => {
    setActiveStep((prevActiveStep) => {
      // Check if there's a next card to move to
      if (prevActiveStep + 1 < maxSteps && nutrition[prevActiveStep + 1]) {
        return prevActiveStep + 1;
      } else {
        // Move to the previous card if next is undefined
        return Math.max(prevActiveStep - 1, 0);
      }
    });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => {
      // Check if there's a previous card to move to
      if (prevActiveStep - 1 >= 0 && nutrition[prevActiveStep - 1]) {
        return prevActiveStep - 1;
      } else {
        // Move to the next card if previous is undefined
        return Math.min(prevActiveStep + 1, maxSteps - 1);
      }
    });
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Card sx={{ minWidth: 675, margin: 2 }}>
      <CardContent>
        <Grid container spacing={2} sx={{ marginBottom: 1 }}>
          <Grid item xs={2}>
            <Typography variant="h6">Recipe</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6">Fats</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6">Protein</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6">Calories</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6">Actions</Typography>
          </Grid>
        </Grid>
        {nutrition.map((nutritionItem, index) => (
        <div key={index}>
          {Math.abs(activeStep - index) <= 2 ? (
            <NutritionCard
              nutritionItem={nutritionItem} // Correct prop name to meal instead of nutrition
            />
          ) : null}
        </div>
      ))}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Chip label={`Total Fats: ${totals.totalFats}g`} color="primary" />

          <Chip
            label={`Total Protein: ${totals.totalProtein}g`}
            color="primary"
          />

          <Chip
            label={`Total Calories: ${totals.totalCalories}`}
            color="primary"
          />
        </div>
      </CardContent>
      
    </Card>
  );
}

export default NutritionCarousel;
