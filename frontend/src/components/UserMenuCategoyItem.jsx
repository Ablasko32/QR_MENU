import React, { useState } from "react";

const UserMenuCategoryItem = (props) => {
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!isOpen);
  };

  return (
    <>
      <div
        onClick={handleOpen}
        className="bg-white/20 p-4 rounded-md w-1/2 relative "
      >
        <h2>{props.item[0].toUpperCase() + props.item.slice(1)}</h2>
      </div>

      <div className="w-full px-2 ">
        {isOpen && (
          <div className="bg-white/20 w-full p-4 px-8 relative rounded-md shadow-xl ">
            <div className="flex justify-between pb-2 font-medium">
              <h3>Naziv</h3>
              <h3>Količina</h3>
              <h3>Cijena</h3>
            </div>
            {props.data.map((item, index) => {
              return (
                <div key={index} className="flex justify-between">
                  <p>{item.name}</p>
                  <p>{item.quantity}</p>
                  <p>{item.price}€</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default UserMenuCategoryItem;
