import * as React from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchAllNutrition } from "../../Pages/store/slices/nutritionSlice";
import NutritionsList from "../NutritionsList/NutritionsList";
import UpdateNutrition from "../../Pages/NutriCalc/UpdateNutrition";

export default function NutritionCard({ nutritionItem }) {
  const dispatch = useDispatch();
  const [updateModal, setUpdateModal] = React.useState(false);
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/nutrition/nutritions/${nutritionItem._id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(fetchAllNutrition());
      alert("Nutrition deleted successfully");
    } catch (err) {
      console.error("Error deleting nutrition:", err);
    }
  };
  const handleUpdate = () => setUpdateModal(true);
  return (
    <Card
      sx={{
        maxWidth: 700,
        background: "transparent",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#B81D33" }} aria-label="nutrition">
            {nutritionItem?.food?.recipeName?.charAt(0)}
          </Avatar>
        }
        action={
          <div className="actions">
            <IconButton
              onClick={handleUpdate}
              sx={{ color: "#B81D33" }}
              aria-label="edit"
            >
              <EditIcon />
            </IconButton>

            <IconButton
              onClick={handleDelete}
              sx={{ color: "#B81D33" }}
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </div>
        }
        title={nutritionItem?.food?.recipeName}
      />

      <CardContent>
        <NutritionsList item={nutritionItem} />
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></CardActions>
      {updateModal && (
        <UpdateNutrition
          nutrition={nutritionItem}
          openModal={updateModal}
          handleModalClose={() => {
            setUpdateModal(!updateModal);
          }}
        />
      )}
    </Card>
  );
}
