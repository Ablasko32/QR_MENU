import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// icons
import CoffeeIcon from "@mui/icons-material/Coffee";
import WineBarIcon from "@mui/icons-material/WineBar";
import LocalBarIcon from "@mui/icons-material/LocalBar";

const LoginPanel = () => {
  // navigation
  const navigate = useNavigate();

  // error handling
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleUserFormInput = (event) => {
    const { name, value } = event.target;
    setFormData((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://192.168.0.17:3000/login",
        formData
      );
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      if (err.response) {
        setErrorMessage(err.response.data.error);
      } else {
        setErrorMessage("An error occured, please try again");
      }
    }
  };

  return (
    <>
      <div className="bg-bglogin bg-center bg-cover">
        <div className="container mx-auto max-w-xl  p-4 flex flex-col h-screen justify-center ">
          <div className="flex justify-center space-x-2">
            <CoffeeIcon />
            <WineBarIcon />
            <LocalBarIcon />
          </div>
          <h2 className="text-center mt-3 mb-6">
            Welcome to QRMenu {formData.username}
          </h2>
          {errorMessage && (
            <p className="text-center text-sm mb-2 text-red-500">
              {errorMessage}
            </p>
          )}
          <form className="flex flex-col space-y-1" onSubmit={handleSubmit}>
            <input
              value={formData.username}
              onChange={handleUserFormInput}
              name="username"
              type="text"
              placeholder="Username"
              className="p-1 py-2 rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-purple-900 opacity-70"
            ></input>
            <input
              value={formData.password}
              onChange={handleUserFormInput}
              name="password"
              type="password"
              className="p-1 py-2 rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-purple-900 opacity-70"
              placeholder="Password"
            ></input>
            <input
              type="submit"
              value="Login"
              className="text-xl border-b border-slate-100 mx-auto cursor-pointer font-semibold"
            ></input>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPanel;
