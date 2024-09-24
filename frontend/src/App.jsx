import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// sites
import CoffeeExample from "./components/Sites/ExampleCoffe";
import LoginPanel from "./components/Sites/LoginPanel";
import Dahsboard from "./components/Sites/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/coffe-example1" element={<CoffeeExample />} />
        <Route path="/admin" element={<LoginPanel />} />
        <Route path="/dashboard" element={<Dahsboard />} />
      </Routes>
    </Router>
  );
}

export default App;
