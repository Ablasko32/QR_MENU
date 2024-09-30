import React from "react";
import { useNavigate } from "react-router-dom";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const LogOut = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      onClick={handleLogout}
      className="absolute top-2 right-2 cursor-pointer"
    >
      <LogoutOutlinedIcon />
    </div>
  );
};

export default LogOut;
