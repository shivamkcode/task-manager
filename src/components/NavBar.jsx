/* eslint-disable react/prop-types */
import { useState } from "react";
import Dots from "../assets/icon-vertical-ellipsis.svg";
import Logo from "../assets/logo-light.svg";

import Button from "./Button";
import BoardForm from "./BoardForm";
import DeleteConfirm from "./DeleteConfirm";
import TaskForm from "./TaskForm";

const NavBar = ({ sidebarVisible, boardName, setBoardName, boardId }) => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showEditBoard, setShowEditBoard] = useState(false);
  const [editBoardForm, setEditBoardForm] = useState(false);
  const [deleteBoardForm, setDeleteBoardForm] = useState(false);
    

  return (
    <nav className="nav">
      {!sidebarVisible && <img src={Logo} alt="logo" />}
      <h2>Board Name</h2>
      <Button disabled={showTaskForm} onClick={() => setShowTaskForm(true)}>
        +Add New task
      </Button>
      {showTaskForm && (
        <TaskForm boardId={boardId} showForm={setShowTaskForm} heading={'Add New'} />
      )}
      <img
        onClick={() => setShowEditBoard(!showEditBoard)}
        src={Dots}
        alt="dots"
      />
      {showEditBoard && (
        <div className="edit-option">
          <span onClick={() => setEditBoardForm(true)}>Edit Board</span>
          <span
            onClick={() => setDeleteBoardForm(true)}
            style={{ color: "red" }}
          >
            Delete Board
          </span>
        </div>
      )}
      {editBoardForm && (
        <BoardForm
          value={boardName}
          formHeading={"Edit Board"}
          boardName={boardName}
          setBoardName={setBoardName}
          showForm={setEditBoardForm}
        />
      )}
      {deleteBoardForm && (
        <DeleteConfirm
          text="board"
          name={boardName}
          showForm={setDeleteBoardForm}
        />
      )}
    </nav>
  );
};

export default NavBar;
