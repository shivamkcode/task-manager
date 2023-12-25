/* eslint-disable react/prop-types */
import Dots from "../assets/icon-vertical-ellipsis.svg";
import Logo from "../assets/logo-light.svg";

import Button from "./Button";

const NavBar = ({ boardName, isOpen, setIsOpen, sidebarVisible }) => {

  return (
    <nav className="nav">
      {!sidebarVisible && <img src={Logo} alt="logo" />}
      <h2>{boardName}</h2>
      <Button disabled={isOpen.showTaskForm} onClick={() => setIsOpen({showTaskForm: true})}>
        +Add New task
      </Button>
      
      <img
        onClick={() => setIsOpen(prev => ({
          ...prev,
          showEditBoard: !prev.showEditBoard
        }))}
        src={Dots}
        alt="menu"
      />
      
    </nav>
  );
};

export default NavBar;
