import { useState } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Board from "../components/Board";

const Dashboard = ( isOpen ) => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  // fetch("http://localhost:3000/tasks")
  //   .then((response) => response.json())
  //   .then((data) => console.log(data))
  //   .catch((error) => console.error("Error:", error));

  return (
    <main className="container">
      <NavBar isOpen={isOpen} sidebarVisible={sidebarVisible} />
      <SideBar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
      />
      <Board />
    </main>
  )
}

export default Dashboard
