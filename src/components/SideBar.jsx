/* eslint-disable react/prop-types */
import { useState } from "react";
import "./css/sideBar.css";

import BoardIcon from "../assets/icon-board.svg";
import DarkThemeIcon from "../assets/icon-dark-theme.svg";
import LightThemeIcon from "../assets/icon-light-theme.svg";
import EyeIcon from "../assets/icon-show-sidebar.svg";
import HideEyeIcon from "../assets/icon-hide-sidebar.svg";
import Cross from "../assets/icon-cross.svg";
import Card from "./Card";
import Button from "./Button";

const SideBar = ({
  darkMode,
  setDarkMode,
  sidebarVisible,
  setSidebarVisible,
  isOpen,
}) => {
  const [boardName, setBoardName] = useState("");
  const [addBoard, setAddBoard] = useState(false);
  const [boardColumns, setBoardColumns] = useState(["Todo", "Doing", "Done"]);

  const addNewBoard = async (name, userId, columns) => {
    const response = await fetch("http://localhost:3000/boards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, userId, columns }),
    });

    if (response.ok) {
      const board = await response.json();
      console.log("Board created:", board);
    } else {
      console.log("Error creating board:", response.status);
    }
  };

  // const getAllBoards = async () => {
  //   const response = await fetch("http://localhost:3000/boards");

  //   if (response.ok) {
  //     const boards = await response.json();
  //     console.log("Boards:", boards);
  //   } else {
  //     console.log("Error getting boards:", response.status);
  //   }
  // };

  // useEffect(() => {
  //   getAllBoards();
  // }, []);

  const addNewColumn = () => {
    setBoardColumns([...boardColumns, ""]);
  };

  const removeColumn = (index) => {
    setBoardColumns(boardColumns.filter((boardColumn, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addNewBoard(boardName, "userId", boardColumns);
    console.log(boardName);
    console.log(boardColumns);
  };

  const handleBoardColumnChange = (index) => (event) => {
    const newBoardColumns = [...boardColumns];
    newBoardColumns[index] = event.target.value;
    setBoardColumns(newBoardColumns);
  };

  return (
    <div className="aside">
      {sidebarVisible && (
        <aside>
          <div className="logo-container">
            <div className="logo" />
            <h1>App Name</h1>
          </div>
          <div className="board-list">
            <h6>ALL BOARDS {/*boardList.length*/}</h6>
            {/* {BoardList.length > 0 &&
        BoardList.map((board) => {
          <div className="board-name">
            <img src={BoardIcon} alt="board" />
            <h5>{board.name}</h5>
          </div>;
        })} */}
            <div className="board-name">
              <img src={BoardIcon} alt="board" />
              <h5 onClick={() => setAddBoard(true)}>+Create New Board</h5>
            </div>
          </div>
          {addBoard && (
            <Card isOpen={!isOpen} showShadow={true}>
              <h3>Add New Board</h3>
              <img onClick={() => setAddBoard(false)} src={Cross} alt="X" />
              <form action="submit">
                <label htmlFor="name">
                  Board Name
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="e.g. Web Design"
                    autoComplete="on"
                    onChange={(e) => setBoardName(e.target.value)}
                    required
                  />
                </label>
                <label>
                  Board Columns
                  {boardColumns.map((boardColumn, index) => (
                    <div key={index}>
                      <input
                        type="text"
                        id={`BoardColumn-${index + 1}`}
                        name={`BoardColumn-${index + 1}`}
                        placeholder="status"
                        value={boardColumns[index]}
                        onChange={handleBoardColumnChange(index)}
                        required
                      />
                      <img
                        onClick={() => removeColumn(index)}
                        src={Cross}
                        alt="X"
                      />
                    </div>
                  ))}
                </label>
                <Button color="gray" onClick={addNewColumn}>
                  +Add New Column
                </Button>
                <Button
                  disabled={!boardName}
                  onClick={(e) => {
                    handleSubmit(e);
                    setAddBoard(false);
                  }}
                >
                  Create New Board
                </Button>
              </form>
            </Card>
          )}
          <div className="modeSelect">
            <div className="mode-change">
              <img src={LightThemeIcon} alt="theme" />
              <label className="switch">
                <input type="checkbox" onClick={() => setDarkMode(!darkMode)} />
                <span className="slider round"></span>
              </label>
            <img src={DarkThemeIcon} alt="moon" />
            </div>
            <div className="hide-sidebar" onClick={() => setSidebarVisible(!sidebarVisible)}>
              <img src={HideEyeIcon} alt="eye" />
              <span>Hide SideBar</span>
            </div>
          </div>
        </aside>
      )}
      {!sidebarVisible && (
        <div
          onClick={() => setSidebarVisible(!sidebarVisible)}
          style={{ background: "purple" }}
        >
          <img src={EyeIcon} alt="eye" />
        </div>
      )}
    </div>
  );
};

export default SideBar;
