import React from "react";
import CategoryList from "./components/CategoryList";
import Socials from "./components/Socials";
import Header from "./components/Header";
import Disclaimer from "./components/Disclaimer";
import WorkingHours from "./components/WorkingHours";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <CategoryList />
      <Socials />
      <WorkingHours />
      <Disclaimer />
      <Footer />
    </>
  );
}

export default App;
