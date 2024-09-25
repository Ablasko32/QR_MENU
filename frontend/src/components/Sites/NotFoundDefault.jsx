import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundDefault = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/admin");
  };

  return (
    <>
      <div className="bg-bgdash bg-center bg-cover relative">
        <div className="container mx-auto h-screen flex justify-center items-center p-2  ">
          <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent to-black"></div>
          <div className="flex flex-col items-center space-y-3 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <h2 className="text-6xl font-semibold">Oops!</h2>
            <p className="text-5xl text-center">
              Tražena stranica nije pronađena!
            </p>
            <button
              onClick={handleClick}
              className="bg-white/30  px-4 py-2 rounded-md"
            >
              Prijavi se!
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundDefault;
