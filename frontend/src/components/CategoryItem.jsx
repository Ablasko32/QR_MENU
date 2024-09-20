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
        className="bg-white/20 shadow-xl  h-24 lg:h-32 w-full flex items-center space-x-5 rounded-xl overflow-hidden cursor-pointer
        
        hover:scale-105"
      >
        <div className="w-1/3 h-full">
          <img
            className="w-full h-full object-cover filter brightness-90"
            src={props.img}
          />
        </div>

        <div className="w-full flex flex-col justify-center">
          <p className="text-2xl font-semibold tracking-wide text-slate-900 ">
            {props.title}
          </p>
          <div className="border-b border-slate-900/20 mr-5 "></div>
        </div>
      </div>
      {isOpen && <DropdownList list={props.list} />}
    </>
  );
};

export default CategoryItem;
