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
import axios from "axios";
import ShoppingsList from "../ShoppingsList/ShoppingsList";
import { fetchAllShoppingLists } from "../../Pages/store/slices/shoppingSlice";
import UpdateShopping from "../../Pages/Shopping/UpdateShopping";

export default function ShoppingCard({ shoppingItem }) {
  const dispatch = useDispatch();
  const [updateModal, setUpdateModal] = React.useState(false);
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/shopping/shoppingLists/${shoppingItem._id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(fetchAllShoppingLists())
      alert("Shopping List deleted successfully");
    } catch (err) {
      console.error("Error deleting shopping:", err);
    }
  };
  const handleUpdate=()=>setUpdateModal(true);
  console.log("shoppingItem",shoppingItem)
  return (
    <Card
      sx={{
        maxWidth: 700,
        background:"transparent",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#B81D33" }} aria-label="shopping">
            {shoppingItem?.name?.charAt(0)}
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
        title={shoppingItem?.name}
      />

      <CardContent>
        <ShoppingsList items={shoppingItem?.items} />
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></CardActions>
      {updateModal && (
        <UpdateShopping
          shopping={shoppingItem}
          openModal={updateModal}
          handleModalClose={() => {
            setUpdateModal(!updateModal);
          }}
        />
      )}
    </Card>
  );
}
