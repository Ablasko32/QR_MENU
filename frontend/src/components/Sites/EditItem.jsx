import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const EditItem = () => {
  const location = useLocation();
  const { item } = location.state;
  const item_id = item.id;

  const [formData, setFormData] = useState({
    name: item.name,
    quantity: item.quantity,
    price: item.price,
  });

  const handleFormEntry = (event) => {
    const { name, value } = event.target;
    setFormData((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .patch("http://192.168.0.17:3000/items/" + item_id, formData)
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
    <>
      <div className="container mx-auto p-4 flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="text-gray-500 flex flex-col space-y-1"
        >
          <input
            onChange={handleFormEntry}
            name="name"
            type="text"
            className="p-2 rounded-md"
            value={formData.name}
          />
          <input
            onChange={handleFormEntry}
            name="quantity"
            type="text"
            className="p-2 rounded-md"
            value={formData.quantity}
          />
          <input
            onChange={handleFormEntry}
            name="price"
            type="text"
            className="p-2 rounded-md"
            value={formData.price}
          />
          <input type="submit" />
        </form>
      </div>
    </>
  );
};

export default EditItem;
