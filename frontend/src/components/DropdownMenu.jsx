import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DropdownMenu = () => {
  const [isOpen, setOpen] = useState(false);

  const [buttonText, setButtonText] = useState("Novi unos");

  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(!isOpen);
    setButtonText(isOpen ? "Novi unos" : "Zatvori");
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
        setOpen(false);
        window.location.reload();
        navigate("/dashboard");
      });
  };

  return (
    <div className="flex flex-col justify-center mb-5 relative ">
      <button
        onClick={handleOpen}
        className=" bg-white/70 text-xl font-semibold text-gray-500  text-black mx-auto p-2 px-3 rounded-md  backdrop-blur-md"
      >
        {buttonText}
      </button>

      {/* dropdown form */}
      {isOpen && (
        <div className="container mx-auto mt-2 max-w-xl">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col px-8 space-y-1 text-gray-500"
          >
            <input
              value={formData.name}
              name="name"
              onChange={handleFormEntry}
              type="text"
              placeholder="Unesi naziv"
              className="p-2 rounded-md focus:ring-purple-900 opacity-70"
            />
            <input
              value={formData.quantity}
              name="quantity"
              onChange={handleFormEntry}
              type="text"
              placeholder="Unesi količinu (0,33)"
              className="p-2 rounded-md focus:ring-purple-900 opacity-70"
            />
            <input
              value={formData.price}
              name="price"
              onChange={handleFormEntry}
              type="number"
              placeholder="Unesi cijenu (4.50)"
              className="p-2 rounded-md focus:ring-purple-900 opacity-70"
            />
            <select
              value={formData.category}
              name="category"
              className="p-2 rounded-md  focus:ring-purple-900 opacity-70 "
              onChange={handleFormEntry}
            >
              <option value="" disabled>
                Izaberi kategoriju
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
              value="Spremi"
              className="bg-white/70 font-semibold text-xl p-1 mx-auto rounded-md "
            ></input>
          </form>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
