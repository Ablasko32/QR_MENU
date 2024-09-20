import React, { useState } from "react";
import DropdownList from "./DropdownList";

const CategoryItem = (props) => {
  const [isOpen, toggleOpen] = useState(false);

  const openMenu = () => {
    toggleOpen(!isOpen);
  };

  return (
    <>
      <div
        onClick={openMenu}
        className="bg-white/10 z-20  backdrop-blur-sm  border border-white/20 shadow-xl  h-24 lg:h-32 w-full flex items-center space-x-5 rounded-xl overflow-hidden cursor-pointer
        
        hover:scale-105"
      >
        <div className="w-1/2 h-full">
          <img
            className="w-full h-full object-cover rounded-r-md filter brightness-75  "
            src={props.img}
          />
        </div>

        <div className="w-full flex flex-col justify-center ">
          <p className="text-2xl font-semibold tracking-wide opacity-85   ">
            {props.title}
          </p>
          <div className="border-b border-slate-100/20 mr-5 "></div>
        </div>
      </div>
      {isOpen && <DropdownList list={props.list} />}
    </>
  );
};

export default CategoryItem;
