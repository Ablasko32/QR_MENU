import React, { useState } from "react";
import axios from "axios";

const DropdownMenu = () => {
  const [isOpen, setOpen] = useState(false);

  const [buttonText, setButtonText] = useState("Add New");

  const handleOpen = () => {
    setOpen(!isOpen);
    setButtonText(isOpen ? "Add New" : "Close");
  };

  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    price: "",
    category: "",
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
      .post("http://192.168.0.17:3000/items", formData, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      });
  };

  return (
    <div className="flex flex-col justify-center mb-5">
      <button
        onClick={handleOpen}
        className="bg-slate-100 text-black mx-auto p-2 px-3 rounded-md"
      >
        {buttonText}
      </button>

      {/* dropdown form */}
      {isOpen && (
        <div className="container mx-auto mt-2">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col px-8 space-y-1 text-gray-500"
          >
            <input
              value={formData.name}
              name="name"
              onChange={handleFormEntry}
              type="text"
              placeholder="Item name ex. Coke"
              className="p-2 rounded-md focus:ring-purple-900 opacity-70"
            />
            <input
              value={formData.quantity}
              name="quantity"
              onChange={handleFormEntry}
              type="text"
              placeholder="Item quantity ex. 0,33"
              className="p-2 rounded-md focus:ring-purple-900 opacity-70"
            />
            <input
              value={formData.price}
              name="price"
              onChange={handleFormEntry}
              type="number"
              placeholder="Item price ex. 8.50"
              className="p-2 rounded-md focus:ring-purple-900 opacity-70"
            />
            <select
              value={formData.category}
              name="category"
              className="p-2 rounded-md  focus:ring-purple-900 opacity-70 "
              onChange={handleFormEntry}
            >
              <option value="" disabled>
                Choose a category
              </option>
              <option value="beer">Beer</option>
              <option value="cocktails">Cocktails</option>
              <option value="coffe">Coffe</option>
            </select>
            {/* <input
              name="category"
              onChange={handleFormEntry}
              type="text"
              placeholder="Item category"
              className="p-2 rounded-md"
            /> */}
            <input
              type="submit"
              value="Add"
              className="border-b border-slate-100 pt-2 mx-auto "
            ></input>
          </form>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
