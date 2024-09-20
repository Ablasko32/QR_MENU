import React, { useEffect, useState } from "react";

const Footer = () => {
  const [year, setYear] = useState("");

  useEffect(() => {
    const year = new Date().getFullYear();
    setYear(year);
  }, []);

  return (
    <>
      <footer className="text-center pb-5  font-thin text-slate-100/50">
        <p>Copyright &copy; {year} Antonio Blašković</p>
      </footer>
    </>
  );
};

export default Footer;
