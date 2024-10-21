import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./pages/register/Register";
import Login from "./pages/login/login";
import Tasks from "./pages/tasks/tasks";

const App = () => {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;