import React from "react";

const DropdownList = (props) => {
  return (
    <div className=" w-full z-20  bg-white/10 backdrop-blur-md rounded-md bg-texture shadow-3xl  !mt-1 relative z-10 pb-6 pt-1">
      <table className="w-full mt-2">
        <thead>
          <tr className="font-medium  ">
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {props.list.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}€</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DropdownList;
