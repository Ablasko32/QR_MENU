import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditItem = () => {
  const navigate = useNavigate();
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
    navigate("/dashboard");
  };

  return (
    <>
      <div className="h-screen flex justify-center items-center bg-bgdash bg-center bg-cover relative">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-black/20 to-black  "></div>
        <div className="container mx-auto p-4 flex justify-center relative ">
          <form
            onSubmit={handleSubmit}
            className="text-gray-500 flex flex-col space-y-1 bg-white/10 p-7 rounded backdrop-blur-sm"
          >
            <label htmlFor="name" className="text-slate-100">
              Naziv:
            </label>
            <input
              onChange={handleFormEntry}
              name="name"
              type="text"
              className="p-2 rounded-md opacity-75"
              value={formData.name}
            />
            <label htmlFor="quantity" className="text-slate-100">
              Količina:
            </label>
            <input
              id="quantity"
              onChange={handleFormEntry}
              name="quantity"
              type="text"
              className="p-2 rounded-md opacity-75"
              value={formData.quantity}
            />
            <label htmlFor="price" className="text-slate-100">
              Cijena:
            </label>
            <input
              id="price"
              onChange={handleFormEntry}
              name="price"
              type="text"
              className="p-2 rounded-md opacity-75"
              value={formData.price}
            />
            <input
              type="submit"
              value="Spremi"
              className="text-slate-100 border-b mx-auto cursor-pointer"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default EditItem;
