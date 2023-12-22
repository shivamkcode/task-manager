import { useState } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Board from "../components/Board";

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [boardName, setBoardName] = useState("");
  const [addBoard, setAddBoard] = useState(false);

  // fetch("http://localhost:3000/tasks")
  //   .then((response) => response.json())
  //   .then((data) => console.log(data))
  //   .catch((error) => console.error("Error:", error));

  return (
    <main className="container">
      <NavBar
        boardName={boardName}
        setAddBoard={setAddBoard}
        addBoard={addBoard}
        setBoardName={setBoardName}
        sidebarVisible={sidebarVisible}
      />
      <SideBar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
        boardName={boardName}
        setAddBoard={setAddBoard}
        addBoard={addBoard}
        setBoardName={setBoardName}
      />
      <Board />
    </main>
  );
};

export default Dashboard;
