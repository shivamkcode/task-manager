import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";

import LoginPage from "./pages/login";
import SignupPage from "./pages/signUp";
import Dashboard from "./pages/dashboard";
import { useEffect, useState } from "react";
import Profile from "./pages/profile";

const App = () => {
  const [isOpen, setIsOpen] = useState({
    darkMode: false,
    addBoard: false,
    showTaskForm: false,
    editBoardForm: false,
    deleteBoardForm: false,
    showEditBoard: false,
  });
  const [user, setUser] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [chosenBoardId, setChosenBoardId] = useState(1);
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token){
      return
    }
    getUser(token);
  }, []);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token){
      return
    }
    getBoards(token);
  }, [chosenBoardId, isOpen]);

  
  const getBoards = async (token) => {
    const response = await fetch(`http://localhost:3000/boards`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });

    if (response.ok) {
      const boards = await response.json();
      setBoards(boards);
    } else {
      console.log("Error getting boards:", response.status);
    }
  };


  const getUser = async (token) => {
    try {
      const response = await fetch(`http://localhost:3000/users`, {
        method: "GET",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });
        const user = await response.json();
        setUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async (id, userData, token) => {
    try {
      const response = await fetch(`/users/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (id, token) => {
    try {
      await fetch(`/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("User deleted");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                sidebarVisible={sidebarVisible}
                setSidebarVisible={setSidebarVisible}
                userName={user?.username}
                chosenBoardId={chosenBoardId}
                setChosenBoardId={setChosenBoardId}
                getBoards={getBoards}
                boards={boards}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                sidebarVisible={sidebarVisible}
                setSidebarVisible={setSidebarVisible}
                chosenBoardId={chosenBoardId}
                setChosenBoardId={setChosenBoardId}
                user={user}
                boards={boards}
              />
            }
          />
          <Route
            path="/login"
            element={
              <LoginPage
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <SignupPage
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            }
          />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
