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

export function NutritionCarousel() {
  const nutrition=useSelector(state=>state.nutrition.nutrition)
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
    <Box
      sx={{
        maxWidth: 700,
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        margin: "auto", // Center the box horizontally
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: 700,
          marginBottom: 2, // Add some margin between the buttons and the carousel
        }}
      >
        <Button
          sx={{ color: "#B81D33" }}
          size="small"
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
          Back
        </Button>
        <Button
          sx={{ color: "#B81D33" }}
          size="small"
          onClick={handleNext}
          disabled={activeStep === maxSteps - 1}
        >
          Next
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </Button>
      </Box>
      {nutrition?.length > 0 && (
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
          sx={{
            maxWidth: 600,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor:"transparent",
          }}
          style={{
            background:"transparent",
          }}
        >
          {nutrition.map((nutritionItem, index) => (
            <div key={index}>

              {Math.abs(activeStep - index) <= 2 ? (
                <NutritionCard
                nutritionItem={nutritionItem} // Correct prop name to meal instead of nutrition
                />
              ) : null}
            </div>
          ))}
        </SwipeableViews>
      )}
    </Box>
  );
}

export default NutritionCarousel;
