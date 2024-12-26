import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";

import LoginPage from "./pages/login";
import Dashboard from "./pages/dashboard";
import { useEffect, useState } from "react";
import Profile from "./pages/profile";
import { RouteProvider } from "./components/RouteContext";
import Alert from "./components/Alert";

const App = () => {
  const [isOpen, setIsOpen] = useState({
    addBoard: false,
    showTaskForm: false,
    editBoardForm: false,
    deleteBoardForm: false,
    showEditBoard: false,
  });
  const [user, setUser] = useState();
  const [alert, setAlert] = useState(null);
  const [chosenBoardId, setChosenBoardId] = useState(
    () => JSON.parse(localStorage.getItem("chosenBoardId")) || null
  );
  const [boards, setBoards] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [sidebarVisible, setSidebarVisible] = useState(() =>
    JSON.parse(localStorage.getItem("sideBar")) !== undefined
      ? JSON.parse(localStorage.getItem("sideBar"))
      : windowWidth > 600
      ? true
      : false
  );
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("sideBar", JSON.stringify(sidebarVisible));
  }, [sidebarVisible]);

  useEffect(() => {
    localStorage.setItem("chosenBoardId", JSON.stringify(chosenBoardId));
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

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 2000);
  };

  const getBoards = async (token) => {
    const response = await fetch(`${import.meta.env.VITE_SOME_SERVER}/boards`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });

    if (response.ok) {
      const boards = await response.json();
      if (boards.length > 0) {
        setBoards(boards);
        // setChosenBoardId(chosenBoardId ? chosenBoardId : boards[0].id);
      }
    } else {
      console.log("Error getting boards:", response.status);
    }
  };

  const getUser = async (token) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SOME_SERVER}/users`,
        {
          method: "GET",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const user = await response.json();
      setUser(user);
      return user;
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async (id, userData, token) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SOME_SERVER}/users/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      showAlert(error, "error");
    }
  };

  const deleteUser = async (id, token) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SOME_SERVER}/users/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        showAlert("User deleted", "success");
      }
    } catch (error) {
      showAlert(error, "error");
    }
  };

  return (
    <main>
      <Router>
        <RouteProvider>
          {alert && <Alert message={alert.message} type={alert.type} />}
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  showAlert={showAlert}
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
                  updateUser={updateUser}
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
                  showAlert={showAlert}
                  getUser={getUser}
                  updateUser={updateUser}
                  deleteUser={deleteUser}
                />
              }
            />
            <Route
              path="/login"
              element={<LoginPage showAlert={showAlert} />}
            />
          </Routes>
        </RouteProvider>
      </Router>
    </main>
  );
};

export default App;
