import React from "react";
import CoffeeIcon from "@mui/icons-material/Coffee";
import WineBarIcon from "@mui/icons-material/WineBar";
import LocalBarIcon from "@mui/icons-material/LocalBar";

const DrinkIconList = () => {
  return (
    <div className="flex justify-center space-x-2">
      <CoffeeIcon />
      <WineBarIcon />
      <LocalBarIcon />
    </div>
  );
};

export default DrinkIconList;
