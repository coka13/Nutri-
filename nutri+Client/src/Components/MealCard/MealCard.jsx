import * as React from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useDispatch } from "react-redux";
import { deleteMeal, fetchAllMeals } from "../../Pages/store/slices/mealSlice";
import axios from "axios";
import MealList from "../MealList/MealList";
import MealsList from "../MealsList/MealsList";
import UpdateMeal from "../../Pages/Meal/UpdateMeal";

export default function MealCard({ meal }) {
  const dispatch = useDispatch();
  const [updateModal, setUpdateModal] = React.useState(false);
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/meal/meals/${meal._id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(fetchAllMeals());
      alert("Meal deleted successfully");
    } catch (err) {
      console.error("Error deleting meal:", err);
    }
  };
  const handleUpdate=()=>setUpdateModal(true);
  return (
    <Card
      sx={{
        maxWidth: 700,
        background:"transparent",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#B81D33" }} aria-label="meal">
            {meal.name.charAt(0)}
          </Avatar>
        }
        action={
          <div className="actions">
            <IconButton sx={{ color: "#B81D33" }} aria-label="edit">
              <EditIcon onClick={handleUpdate}/>
            </IconButton>

            <IconButton sx={{ color: "#B81D33" }} aria-label="delete">
              <DeleteIcon onClick={handleDelete} />
            </IconButton>
          </div>
        }
        title={meal.name}
      />

      <CardContent>
        <MealsList dishes={meal} />
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></CardActions>
      {updateModal && (
        <UpdateMeal
          meal={meal}
          openModal={updateModal}
          handleModalClose={() => {
            setUpdateModal(!updateModal);
          }}
        />
      )}
    </Card>
  );
}
