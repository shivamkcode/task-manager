/* eslint-disable react/prop-types */
import "./css/sideBar.css";

import BoardIcon from "../assets/icon-board.svg";
import DarkThemeIcon from "../assets/icon-dark-theme.svg";
import LightThemeIcon from "../assets/icon-light-theme.svg";
import EyeIcon from "../assets/icon-show-sidebar.svg";
import HideEyeIcon from "../assets/icon-hide-sidebar.svg";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SideBar = ({
  setIsOpen,
  boards,
  chosenBoardId,
  setChosenBoardId,
  sidebarVisible,
  setSidebarVisible,
  windowWidth,
  darkMode,
  setDarkMode,
  userName,
}) => {
  const navigate = useNavigate()
  const toggle = () => {
    let r = document.querySelector(":root");
    if (!darkMode) {
      r.style.setProperty("--primary-color", "#2B2C37");
      r.style.setProperty("--secondary-color", "#20212C");
      r.style.setProperty("--text-color", "#fff");
    } else {
      r.style.setProperty("--primary-color", "#fff");
      r.style.setProperty("--secondary-color", "#F4F7FD");
      r.style.setProperty("--text-color", "black");
    }
  };

  useEffect(() => {
    let r = document.querySelector(":root");
    if (darkMode) {
      r.style.setProperty("--primary-color", "#2B2C37");
      r.style.setProperty("--secondary-color", "#20212C");
      r.style.setProperty("--text-color", "#fff");
    } else {
      r.style.setProperty("--primary-color", "#fff");
      r.style.setProperty("--secondary-color", "#F4F7FD");
      r.style.setProperty("--text-color", "black");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="aside">
      {sidebarVisible && (
        <aside>
          {windowWidth > 600 && (
            <div style={{cursor: "pointer"}} className="logo-container" onClick={() => navigate("/")}>
              <div className="logo" />
              <h1>TaskTracker</h1>
            </div>
          )}
          <h6>ALL BOARDS ({boards?.length})</h6>
          <div className="board-list">
            {boards?.length > 0 &&
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
          </div>
          <div
            onClick={() => setIsOpen({ addBoard: true })}
            style={{ color: "#635FC7", opacity:`${!userName ? '1' : '0'}` }}
            className="board-name add-board"
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

          <div className="modeSelect">
            <div className="mode-change">
              <img src={LightThemeIcon} onClick={() => {
                    setDarkMode(false);
                    toggle();
                  }} alt="theme" />
              <label className="switch">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={() => {
                    setDarkMode(!darkMode);
                    toggle();
                  }}
                />
                <span className="slider round"></span>
              </label>
              <img src={DarkThemeIcon} onClick={() => {
                    setDarkMode(true);
                    toggle();
                  }} alt="moon" />
            </div>
            {windowWidth > 600 && (
              <div
                className="hide-sidebar"
                onClick={() => setSidebarVisible(false)}
              >
                <img src={HideEyeIcon} alt="eye" />
                <span>Hide SideBar</span>
              </div>
            )}
          </div>
        </aside>
      )}
      {!sidebarVisible && windowWidth > 600 && (
        <div className="show-sidebar" onClick={() => setSidebarVisible(true)}>
          <img src={EyeIcon} alt="eye" />
        </div>
      )}
    </div>
  );
};

export default SideBar;
