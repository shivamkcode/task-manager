/* eslint-disable react/prop-types */
import Dots from "../assets/icon-vertical-ellipsis.svg";
import "./css/profile-icon.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import PlusSign from "../assets/icon-add-task-mobile.svg";
import Logo from "../assets/logo-mobile.svg";
import Down from '../assets/icon-chevron-down.svg'
import Up from '../assets/icon-chevron-up.svg'

const NavBar = ({
  boardName,
  isOpen,
  setIsOpen,
  sidebarVisible,
  userName,
  boards,
  windowWidth,
  setSidebarVisible,
}) => {
  const userInitial = userName ? userName[0].toUpperCase() : "";
  const navigate = useNavigate();

  return (
    <nav className={`nav ${sidebarVisible ? "" : "noSideBar-nav"}`}>
      {windowWidth < 600 && (
        <div style={{cursor: "pointer"}} className="card-header" onClick={() => navigate("/")}>
          <img style={{marginRight: '20px'}} src={Logo} alt="logo" />
          {!boardName && <h1>TaskTracker</h1>}
        </div>
      )}
      {windowWidth > 600 && !sidebarVisible && (
        <div style={{cursor: "pointer"}} className="card-header" onClick={() => navigate("/")}>
          <div className="logo" />
          <h1>TaskTracker</h1>
        </div>
      )}
      <h2>{windowWidth < 400 ? boardName?.split(' ')[0] : boardName}</h2>
      {windowWidth < 600 && (
        <img style={{marginLeft:'20px', width:'15px', marginRight:'auto'}} onClick={() => setSidebarVisible(!sidebarVisible)} src={sidebarVisible ? Up : Down} alt="^" />
      )}
      {boardName && (
        <>
          <Button
            disabled={isOpen.showTaskForm}
            onClick={() => setIsOpen({ showTaskForm: true })}
          >
            {windowWidth > 600 ? (
              "+Add New task"
            ) : (
              <img src={PlusSign} alt="+" />
            )}
          </Button>
          <img
            onClick={() =>
              setIsOpen((prev) => ({
                ...prev,
                showEditBoard: !prev.showEditBoard,
              }))
            }
            src={Dots}
            alt="menu"
          />
        </>
      )}
      {!boards && <Button onClick={() => navigate("/")}>{windowWidth < 600 ? '<<' : 'Dashboard'}</Button>}
      <div
        onClick={() => navigate("/profile")}
        className="profile-icon"
        data-initial={`${userInitial}`}
      >
        <span>{userInitial}</span>
      </div>
    </nav>
  );
};

export default NavBar;
