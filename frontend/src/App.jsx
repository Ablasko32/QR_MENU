import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
// sites
import CoffeeExample from "./components/Sites/ExampleCoffe";
import LoginPanel from "./components/Sites/LoginPanel";
import Dahsboard from "./components/Sites/Dashboard";
import EditItem from "./components/Sites/EditItem";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/coffe-example1" element={<CoffeeExample />} />
        <Route path="/admin" element={<LoginPanel />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dahsboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/"
          element={
            <PrivateRoute>
              <EditItem />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
