/* eslint-disable react/prop-types */
import "./css/sideBar.css";

import BoardIcon from "../assets/icon-board.svg";
import DarkThemeIcon from "../assets/icon-dark-theme.svg";
import LightThemeIcon from "../assets/icon-light-theme.svg";
import EyeIcon from "../assets/icon-show-sidebar.svg";
import HideEyeIcon from "../assets/icon-hide-sidebar.svg";
import BoardForm from "./BoardForm";

const SideBar = ({
  darkMode,
  setDarkMode,
  sidebarVisible,
  setSidebarVisible,
  boardName,
  setAddBoard,
  addBoard,
  setBoardName,
  boards,
  chosenBoardId,
  setChosenBoardId,
}) => {
  return (
    <div className="aside">
      {sidebarVisible && (
        <aside>
          <div className="logo-container">
            <div className="logo" />
            <h1>App Name</h1>
          </div>
          <div className="board-list">
            <h6>ALL BOARDS ({boards.length})</h6>
            {boards.length > 0 &&
              boards.map((board, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setChosenBoardId(board.id);
                  }}
                  className={`board-name ${
                    chosenBoardId === board.id ? "selected" : ""
                  }`}
                >
                  <img src={BoardIcon} alt="board" />
                  <h5>{board.name}</h5>
                </div>
              ))}
            <div
              onClick={() => setAddBoard(true)}
              style={{ color: "#635FC7" }}
              className="board-name"
            >
              <img
                style={{
                  filter:
                    "invert(48%) sepia(79%) saturate(2476%) hue-rotate(220deg) brightness(80%) contrast(90%)",
                }}
                src={BoardIcon}
                alt="board"
              />
              <h5>+Create New Board</h5>
            </div>
          </div>
          {addBoard && (
            <BoardForm
              formHeading={"Add New Board"}
              boardName={boardName}
              setBoardName={setBoardName}
              showForm={setAddBoard}
            />
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
            <div
              className="hide-sidebar"
              onClick={() => setSidebarVisible(!sidebarVisible)}
            >
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
