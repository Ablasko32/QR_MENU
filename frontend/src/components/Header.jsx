import React from "react";

const Header = () => {
  return (
    <>
      <header className="bg-bg1 bg-center bg-cover relative z-30 max-w-5xl mx-auto">
        <h1 className="text-center text-slate-100/80 text-7xl lg:text-7xl pt-6 mb-6 font-lobster relative z-30 ">
          Welcome to CaffeName
        </h1>
        <p className="text-center font-lobster pb-6 tracking-wide z-30 relative  ">
          Enjoy your cup of fresh coffe!
        </p>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10"></div>
      </header>
    </>
  );
};

export default Header;
