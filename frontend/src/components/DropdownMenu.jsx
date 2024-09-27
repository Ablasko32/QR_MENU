import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DropdownMenu = (props) => {
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
    category: props.category,
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

        props.handleRender(!props.reRender);

        navigate(`/dashboard/${props.category}`);
      });
  };

  return (
    <div className="relative mt-10 flex flex-col items-start ">
      <button
        onClick={handleOpen}
        className=" bg-white/10 p-4 rounded-md ml-10 mb-2 font-semibold backdrop-blur-sm  "
      >
        {buttonText}
      </button>

      {/* dropdown form */}
      {isOpen && (
        <div className="bg-white/10 py-6 px-2 flex ml-10 rounded-md backdrop-blur-sm">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-start space-y-2"
          >
            <input
              value={formData.name}
              name="name"
              onChange={handleFormEntry}
              type="text"
              placeholder="Unesi naziv"
              className="p-2 rounded-md focus:ring-purple-900 opacity-70 text-gray-500"
            />
            <input
              value={formData.quantity}
              name="quantity"
              onChange={handleFormEntry}
              type="text"
              placeholder="Unesi količinu (0,33)"
              className="p-2 rounded-md focus:ring-purple-900 opacity-70 text-gray-500"
            />
            <input
              value={formData.price}
              name="price"
              onChange={handleFormEntry}
              type="number"
              placeholder="Unesi cijenu (4.50)"
              className="p-2 rounded-md focus:ring-purple-900 opacity-70 text-gray-500"
            />
            {/* <select
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
            </select> */}
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
              className="bg-white/20 rounded-lg px-2 py-1 "
            ></input>
          </form>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
