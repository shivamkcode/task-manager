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
  getBoards,
  getUser,
  windowWidth,
  darkMode,
  setDarkMode,
  showAlert,
  updateUser,
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
        windowWidth={windowWidth}
        setSidebarVisible={setSidebarVisible}
      />
      <SideBar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        boards={boards}
        chosenBoardId={chosenBoardId}
        setChosenBoardId={setChosenBoardId}
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
        windowWidth={windowWidth}
      />
      <Board
        boardName={boards?.find((board) => board.id === chosenBoardId)?.name}
        showAlert={showAlert}
        getBoards={getBoards}
        boards={boards}
        selectedColumns={selectedColumns}
        boardId={chosenBoardId}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setChosenBoardId={setChosenBoardId}
        sidebarVisible={sidebarVisible}
        getUser={getUser}
        windowWidth={windowWidth}
        darkMode={darkMode}
        updateUser={updateUser}
      />
    </main>
  );
};

export default Dashboard;
