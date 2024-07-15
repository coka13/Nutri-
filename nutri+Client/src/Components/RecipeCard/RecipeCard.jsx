import  React ,{useState} from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deleteRecipe } from "../../Pages/store/slices/recipesSlice";
import axios from "axios";
import UpdateRecipe from "../../Pages/Recipe/UpdateRecipe";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeCard({ recipe, expanded, setExpanded }) {
  const dispatch = useDispatch();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/recipe/recipes/${recipe._id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Recipe deleted:", response.data);
      dispatch(deleteRecipe(recipe._id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };
  const [openModal, setOpenModal] = useState(false);
  
  const handleEdit=(id) => {
    setOpenModal(true)
  }
  return (
    <>
      <Card
        sx={{
          maxWidth: 700,
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "#B81D33" }} aria-label="recipe">
              {recipe.recipeName.charAt(0)}
            </Avatar>
          }
          action={
            <div className="actions">
              <IconButton sx={{ color: "#B81D33" }} aria-label="edit">
                <EditIcon onClick={handleEdit}/>
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
          title={recipe.recipeName}
        />
        <CardMedia
          component="img"
          height="350"
          image={recipe.image} // Assuming recipe.image is the URL string
          alt={recipe.name}
        />
        <CardContent>
          <Typography variant="body2">{recipe.description}</Typography>
          <Typography variant="body2" color="text.secondary">
            {recipe.category}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography>Show More Details</Typography>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Ingredients:</Typography>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>
                  <Typography variant="body2" color="text.secondary">
                    {ingredient.ingredient} {ingredient.quantity} (
                    {ingredient.unit})
                  </Typography>
                </li>
              ))}
            </ul>
            <Typography paragraph>Instructions:</Typography>
            <ol>
              {recipe.instructions.map((instruction, index) => (
                <li key={index}>
                  <Typography paragraph variant="body2" color="text.secondary">
                    {instruction}
                  </Typography>
                </li>
              ))}
            </ol>
          </CardContent>
        </Collapse>
      </Card>
      {openModal && (
        <UpdateRecipe
          recipe={recipe}
          resetRecipe
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      )}
    </>
  );
}
