import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DropdownMenu from "../DropdownMenu";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Dahsboard = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://192.168.0.17:3000/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setError(err.response.data.error);
      })
      .finally(console.log("Running"));
  }, []);

  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete item?");
    if (confirmed) {
      axios
        .delete("http://192.168.0.17:3000/items/" + id, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log(res.data);
          setData((prevValue) => prevValue.filter((item) => item.id !== id));
        });
    }
  };

  return (
    <>
      <div className="bg-bglogin bg-center bg-cover h-screen">
        {error && <p className="text-center text-red-400 pt-20">{error}</p>}
        {!error && (
          <h1 className="mb-10 pt-10 text-center text-3xl font-lobster">
            Update your menu here!
          </h1>
        )}

        <DropdownMenu />

        <div className="container mx-auto p-4">
          <table className="w-full text-center">
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td>{item.category}</td>
                    <td onClick={() => navigate("/edit", { state: { item } })}>
                      <EditIcon />
                    </td>
                    <td onClick={() => handleDelete(item.id)}>
                      <DeleteIcon />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dahsboard;
