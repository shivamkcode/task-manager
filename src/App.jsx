import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";

import LoginPage from "./pages/login";
import Dashboard from "./pages/dashboard";
import { useEffect, useState } from "react";
import Profile from "./pages/profile";
import { RouteProvider } from "./components/RouteContext";

const App = () => {
  const [isOpen, setIsOpen] = useState({
    addBoard: false,
    showTaskForm: false,
    editBoardForm: false,
    deleteBoardForm: false,
    showEditBoard: false,
  });
  const [user, setUser] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [chosenBoardId, setChosenBoardId] = useState(() => JSON.parse(localStorage.getItem('chosenBoardId')) || null);
  const [boards, setBoards] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [sidebarVisible, setSidebarVisible] = useState(() => (
    JSON.parse(localStorage.getItem('sideBar')) !== undefined ? JSON.parse(localStorage.getItem('sideBar')) :
    windowWidth > 600 ? true : false
  ));
  const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem('darkMode')) || false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('sideBar', JSON.stringify(sidebarVisible));
  }, [sidebarVisible]);

  useEffect(() => {
    localStorage.setItem('chosenBoardId', JSON.stringify(chosenBoardId));
  }, [chosenBoardId]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    getUser(token);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    getBoards(token);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenBoardId]);

  const getBoards = async (token) => {
    const response = await fetch(`https://task-manager-server-ashy.vercel.app/boards`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });

    if (response.ok) {
      const boards = await response.json();
      setBoards(boards);
      setChosenBoardId(chosenBoardId ? chosenBoardId : boards[0].id)
    } else {
      console.log("Error getting boards:", response.status);
    }
  };

  const getUser = async (token) => {
    try {
      const response = await fetch(`https://task-manager-server-ashy.vercel.app/users`, {
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

  // const updateUser = async (id, userData, token) => {
  //   try {
  //     const response = await fetch(`/users/${id}`, {
  //       method: "PUT",
  //       headers: {
  //         Authorization: `${token}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(userData),
  //     });
  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const deleteUser = async (id, token) => {
  //   try {
  //     await fetch(`/users/${id}`, {
  //       method: "DELETE",
  //       headers: {
  //         Authorization: `${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     console.log("User deleted");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <main>
      <Router>
        <RouteProvider>
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  isOpen={isOpen}
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                  setIsOpen={setIsOpen}
                  sidebarVisible={sidebarVisible}
                  setSidebarVisible={setSidebarVisible}
                  userName={user?.username}
                  chosenBoardId={chosenBoardId}
                  setChosenBoardId={setChosenBoardId}
                  getBoards={getBoards}
                  boards={boards}
                  getUser={getUser}
                  windowWidth={windowWidth}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  isOpen={isOpen}
                  windowWidth={windowWidth}
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
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
            {/* <Route
              path="/signup"
              element={
                <SignupPage
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
              }
            /> */}
          </Routes>
        </RouteProvider>
      </Router>
    </main>
  );
};

export default App;
