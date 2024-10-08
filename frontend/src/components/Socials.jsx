import React from "react";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import GoogleIcon from "@mui/icons-material/Google";

const Socials = () => {
  return (
    <>
      <div className="flex justify-center mt-8 space-x-3 ">
        <div>
          <a href="https://www.facebook.com/nicehairdaynoel/?locale=hr_HR">
            <FacebookOutlinedIcon fontSize="large" />
          </a>
        </div>
        <div>
          <a href="https://www.instagram.com/">
            <InstagramIcon fontSize="large" />
          </a>
        </div>
        <div>
          <a href="https://www.google.com/">
            <GoogleIcon fontSize="large" />
          </a>
        </div>
      </div>
      <div>
        <h2 className="text-center italic font-medium mb-6">Find us!</h2>
      </div>
    </>
  );
};

export default Socials;
