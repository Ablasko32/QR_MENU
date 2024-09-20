import React from "react";
import CategoryList from "./components/CategoryList";
import Socials from "./components/Socials";
import Header from "./components/Header";
import Disclaimer from "./components/Disclaimer";

function App() {
  return (
    <>
      <Header />
      <CategoryList />
      <Socials />
      <Disclaimer />
    </>
  );
}

export default App;
