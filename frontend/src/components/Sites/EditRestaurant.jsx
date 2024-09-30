import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EditRestaurant = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    name: "",
    workhours: "",
    addres: "",
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
  const fetchFormData = () => {
    axios
      .get("http://192.168.0.17:3000/restaurant/data", {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setFormData({ workhours: res.data.working_hours, ...res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchFormData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .patch("http://192.168.0.17:3000/restaurant/", formData, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
      });
    navigate(`/category/`);
  };

  return (
    <>
      <div className="h-screen flex justify-center items-center bg-[url('../bg-dash.jpg')] bg-center bg-cover relative">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-black/20 to-black  "></div>
        <div className="container mx-auto p-4 flex justify-center relative ">
          <form
            onSubmit={handleSubmit}
            className="text-gray-500 flex flex-col space-y-1 bg-white/10 p-7 rounded backdrop-blur-sm"
          >
            <label htmlFor="name" className="text-slate-100">
              Naziv objekta:
            </label>
            <input
              id="name"
              onChange={handleFormEntry}
              name="name"
              type="text"
              className="p-2 rounded-md opacity-75"
              value={formData.name}
            />
            <label htmlFor="workhours" className="text-slate-100">
              Radno vrijeme:
            </label>
            <input
              id="workhours"
              onChange={handleFormEntry}
              name="workhours"
              type="text"
              className="p-2 rounded-md opacity-75"
              value={formData.workhours}
            />
            <label htmlFor="addres" className="text-slate-100">
              Adresa:
            </label>
            <input
              id="addres"
              onChange={handleFormEntry}
              name="addres"
              type="text"
              className="p-2 rounded-md opacity-75"
              value={formData.addres}
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

export default EditRestaurant;
