import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Board from "../components/Board";

// eslint-disable-next-line react/prop-types
const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [boardName, setBoardName] = useState("");
  const [addBoard, setAddBoard] = useState(false);

  const [boards, setBoards] = useState([""]);
  const [chosenBoardId, setChosenBoardId] = useState(1);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [tasks, setTasks] = useState([]);


  useEffect(() => {
    const token = localStorage.getItem("token");
    getBoards(token);
  }, [addBoard]);

  useEffect(() => {
    setSelectedColumns(boards[chosenBoardId - 1]?.columns || []);
  }, [boards, chosenBoardId]);
  

  const getBoards = async (token) => {
    const response = await fetch("http://localhost:3000/boards", {
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

  useEffect(() => {
    async function fetchTasks() {
      const response = await fetch(`http://localhost:3000/tasks?boardId=${chosenBoardId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const tasks = await response.json();
      setTasks(tasks);
    }
    fetchTasks();
    
  }, [chosenBoardId]);

  return (
    <main className="container">
      <NavBar
        boardName={boardName}
        setAddBoard={setAddBoard}
        addBoard={addBoard}
        setBoardName={setBoardName}
        sidebarVisible={sidebarVisible}
        boardId={chosenBoardId}
        selectedColumns={selectedColumns}
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
        boards={boards}
        getBoards={getBoards}
        chosenBoardId={chosenBoardId}
        setChosenBoardId={setChosenBoardId}
      />
      <Board
        sidebarVisible={sidebarVisible}
        boards={boards}
        selectedColumns={selectedColumns}
        tasks={tasks}
        chosenBoardId={chosenBoardId}
        setTasks={setTasks}
        boardId={chosenBoardId}
      />
    </main>
  );
};

export default Dashboard;
