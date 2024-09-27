import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const IndividualDashboardItem = (props) => {
  const item = props.item;
  const navigate = useNavigate();

  return (
    <div className="bg-white/20  backdrop-blur-sm mx-10 p-2 rounded-md">
      <div className="flex justify-between border-b-2 border-slate-100 ">
        <p className="flex space-x-2">
          <span className="font-semibold">{item.name}</span>
          <span className="italic">{item.quantity}</span>
        </p>
        <p>{item.category}</p>
      </div>
      <div className="flex justify-between mt-2">
        <p>{item.price}€</p>{" "}
        <div className="flex justify-center space-x-4">
          <div onClick={() => navigate("/edit", { state: { item } })}>
            <EditIcon />
          </div>
          <div onClick={() => props.handleDelete(item.id)}>
            <DeleteIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualDashboardItem;
