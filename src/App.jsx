import { useState } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/sideBar";
import Board from "../components/Board";
import './App.css'

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  return (
    <main>
      <NavBar sidebarVisible={sidebarVisible} />
      <SideBar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
      />
        <Board />
    </main>
  );
};

export default App;
