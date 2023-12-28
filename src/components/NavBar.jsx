/* eslint-disable react/prop-types */
import Dots from "../assets/icon-vertical-ellipsis.svg";
import "./css/profile-icon.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const NavBar = ({ boardName, isOpen, setIsOpen, sidebarVisible, userName, boards }) => {
  const userInitial = userName ? userName[0].toUpperCase() : "";
  const navigate = useNavigate();

  return (
    <nav className={`nav ${sidebarVisible ? '' : 'noSideBar-nav'}`}>
      {!sidebarVisible && (
        <>
          <div className="logo" />
          <h1>App Name</h1>
        </>
      )}
      <h2>{boardName}</h2>
      {boardName && (
        <>
          <Button
            disabled={isOpen.showTaskForm}
            onClick={() => setIsOpen({ showTaskForm: true })}
          >
            +Add New task
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
      {!boards && (
        <Button onClick={() => navigate('/')}>Dashboard</Button>
      )}
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
