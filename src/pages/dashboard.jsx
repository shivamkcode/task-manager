/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Board from "../components/Board";

const Dashboard = ({
  userName,
  sidebarVisible,
  setSidebarVisible,
  isOpen,
  setIsOpen,
  chosenBoardId,
  setChosenBoardId,
  boards,
  getBoards
}) => {
  const [selectedColumns, setSelectedColumns] = useState([]);

  useEffect(() => {
    setSelectedColumns(
      boards?.find((board) => board.id === chosenBoardId)?.columns || []
    );
  }, [boards, chosenBoardId]);

  return (
    <main className="container">
      <NavBar
        boardName={boards?.find((board) => board.id === chosenBoardId)?.name}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        sidebarVisible={sidebarVisible}
        userName={userName}
        boards={boards}
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
        boardName={boards?.find((board) => board.id === chosenBoardId)?.name}
        getBoards={getBoards}
        boards={boards}
        selectedColumns={selectedColumns}
        boardId={chosenBoardId}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setChosenBoardId={setChosenBoardId}
        sidebarVisible={sidebarVisible}
      />
    </main>
  );
};

export default Dashboard;
