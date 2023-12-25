import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Board from "../components/Board";

// eslint-disable-next-line react/prop-types
const Dashboard = () => {
  const [isOpen, setIsOpen] = useState({
    darkMode: false,
    addBoard : false,
    showTaskForm: false,
    editBoardForm: false,
    deleteBoardForm: false,
    showEditBoard: false,
  });
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [boards, setBoards] = useState([""]);
  const [chosenBoardId, setChosenBoardId] = useState(1);

  useEffect(() => {
    const token = localStorage.getItem("token");
    getBoards(token);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen.addBoard, chosenBoardId]);

  useEffect(() => {
    setSelectedColumns(boards.find((board) => board.id === chosenBoardId)?.columns || []);
  }, [boards, chosenBoardId]);

  const getBoards = async (token) => {
    const response = await fetch(`http://localhost:3000/boards?boardId=${chosenBoardId}`, {
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

  return (
    <main className="container">
      <NavBar
        boardName={boards.find((board) => board.id === chosenBoardId)?.name}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        sidebarVisible={sidebarVisible}
      />
      <SideBar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        boards={boards}
        chosenBoardId={chosenBoardId}
        setChosenBoardId={setChosenBoardId}
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
      />
      <Board
        boardName={boards.find((board) => board.id === chosenBoardId)?.name}
        getBoards={getBoards}
        boards={boards}
        selectedColumns={selectedColumns}
        boardId={chosenBoardId}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setChosenBoardId={setChosenBoardId}
      />
    </main>
  );
};

export default Dashboard;
