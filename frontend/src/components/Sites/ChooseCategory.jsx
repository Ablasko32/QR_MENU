import React, { useState, useEffect } from "react";
import CategoriesIndividualItem from "../CategoriesIndividualItem";
import DrinkIconList from "../DrinkIconList";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const ChooseCategory = () => {
  const [formData, setFormData] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [rennderDependancy, setRenderDependancy] = useState(false);
  const [categories, setCategories] = useState([]);
  const origin = window.location.origin;

  const token = localStorage.getItem("token");
  const user = jwtDecode(token).username;

  const menuUrl = `${origin}/menu/${user}`;
  const handleFormEntry = (event) => {
    const value = event.target.value;
    setFormData(value);
  };

  const openForm = () => {
    setOpen(!isOpen);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    axios
      .post(
        "http://192.168.0.17:3000/categories",
        { name: formData },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        console.log(res.data);
      });

    fetchCategories();
    setFormData("");
    setRenderDependancy(!rennderDependancy);
  };

  const fetchCategories = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://192.168.0.17:3000/categories", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCategories(res.data); // Update categories from the response
      });
  };

  useEffect(() => {
    fetchCategories();
  }, [rennderDependancy]);

  return (
    <>
      <div className="bg-bgdash min-h-screen bg-center bg-cover relative">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-black/20 to-black  "></div>
        <div className="relative pt-10">
          <DrinkIconList />
          <h2 className="text-center text-xl">Kreiraj svoj menu</h2>
          <a className="block text-center mt-4 underline" href={menuUrl}>
            TVOJ MENI
          </a>
        </div>

        <div className="relative mt-10 flex flex-col items-start">
          <button
            onClick={openForm}
            className="bg-white/10 p-4 rounded-md ml-10 mb-2 font-semibold backdrop-blur-sm  "
          >
            Dodaj kategoriju
          </button>

          {isOpen && (
            <div className="bg-white/10 py-6 px-2 flex ml-10 rounded-md backdrop-blur-sm ">
              <form className="flex flex-col items-start space-y-2 ">
                <input
                  name="name"
                  value={formData}
                  onChange={handleFormEntry}
                  type="text"
                  placeholder="Unesi naziv"
                  className="p-1 opacity-70 rounded-md text-gray-500"
                />
                <input
                  className="bg-white/20 rounded-lg px-2 py-1 
                  "
                  value="Dodaj"
                  onClick={handleSubmit}
                  type="submit"
                />
              </form>
            </div>
          )}
        </div>
        {/* border divider */}
        <div className="border-b-4 m"></div>

        {/* categories */}
        <div className="mt-20 relative flex flex-col items-center justify-center space-y-2">
          {categories.map((item, index) => {
            return (
              <CategoriesIndividualItem
                rennderDependancy={rennderDependancy}
                setRenderDependancy={setRenderDependancy}
                id={item.id}
                key={index}
                item={item}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ChooseCategory;
