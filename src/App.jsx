import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";

import LoginPage from "./pages/login";
import SignupPage from "./pages/signUp";
import Dashboard from "./pages/dashboard";

const App = () => {
  return (
    <main>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
