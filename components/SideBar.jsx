/* eslint-disable react/prop-types */
import { useState } from "react";
import "./css/sideBar.css";

import logoLight from "../src/assets/logo-light.svg";
import logoDark from "../src/assets/logo-dark.svg";
import BoardIcon from "../src/assets/icon-board.svg";
import DarkThemeIcon from "../src/assets/icon-dark-theme.svg";
import LightThemeIcon from "../src/assets/icon-light-theme.svg";
import EyeIcon from "../src/assets/icon-show-sidebar.svg";
import HideEyeIcon from "../src/assets/icon-hide-sidebar.svg";
import Cross from "../src/assets/icon-cross.svg";

const SideBar = ({
  darkMode,
  setDarkMode,
  sidebarVisible,
  setSidebarVisible,
}) => {
  const [boardName, setBoardName] = useState("");
  const [addBoard, setAddBoard] = useState(false);
  const [boardColumns, setBoardColumns] = useState(["Todo", "Doing", "Done"]);

  const addNewColumn = () => {
    setBoardColumns([...boardColumns, ""]);
  };

  const removeColumn = (index) => {
    setBoardColumns(boardColumns.filter((boardColumn, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(boardName);
    console.log(boardColumns);
  };

  const handleBoardColumnChange = (index) => (event) => {
    const newBoardColumns = [...boardColumns];
    newBoardColumns[index] = event.target.value;
    setBoardColumns(newBoardColumns);
  };

  return (
    <div>
      {sidebarVisible && (
        <aside>
          <img
            className="app-logo"
            src={darkMode ? logoLight : logoDark}
            alt="logo"
          />
          {/* <h1>App Name</h1> */}
          <div>
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
            <>
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
                <button type="button" onClick={addNewColumn}>
                  +Add New Column
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    handleSubmit(e);
                    setAddBoard(false);
                  }}
                >
                  Create New Board
                </button>
              </form>
            </>
          )}
          <div className="modeSelect">
            <img src={LightThemeIcon} alt="theme" />
            <label className="switch">
              <input type="checkbox" onClick={() => setDarkMode(!darkMode)} />
              <span className="slider round"></span>
            </label>
            <img src={DarkThemeIcon} alt="moon" />
            <div onClick={() => setSidebarVisible(!sidebarVisible)}>
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
