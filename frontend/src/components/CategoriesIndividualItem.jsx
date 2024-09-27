import React from "react";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const CategoriesIndividualItem = (props) => {
  const handleDelete = (id) => {
    axios
      .delete("http://192.168.0.17:3000/categories/" + id)
      .then((res) => {
        console.log(res.data);
        props.setRenderDependancy(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="bg-white/20 p-4 w-1/2 rounded-md backdrop-blur-sm flex justify-between max-w-lg">
      <p> {props.item.name}</p>
      <div className="flex space-x-2">
        <p>
          <EditIcon />
        </p>
        <p onClick={() => handleDelete(props.item.id)}>
          <DeleteIcon />
        </p>
      </div>
    </div>
  );
};

export default CategoriesIndividualItem;
