import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";

import LoginPage from "./pages/login";
import SignupPage from "./pages/signUp";
import Dashboard from "./pages/dashboard";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main>
      <Router>
        <Routes>
          <Route setIsOpen={setIsOpen} isOpen={isOpen} path="/" element={<Dashboard />} />
          <Route
            path="/login"
            element={
              <LoginPage
                isOpen={isOpen}
              />
            }
          />
          <Route path="/signup" element={<SignupPage isOpen={isOpen} />} />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
