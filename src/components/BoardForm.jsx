/* eslint-disable react/prop-types */
import Card from "./Card";
import Cross from "../assets/icon-cross.svg";
import Button from "./Button";
import Input from "./Input";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const BoardForm = ({
  showForm,
  selectedBoard,
  mode,
  getBoards,
  darkMode,
  showAlert,
  setChosenBoardId
}) => {
  const [boardName, setBoardName] = useState(mode ? selectedBoard.name : "");
  const [boardColumns, setBoardColumns] = useState([
    { status: "TODO" },
    { status: "DOING" },
    { status: "DONE" },
  ]);

  useEffect(() => {
    if (mode === "edit") {
      setBoardName(selectedBoard.name);
      setBoardColumns(selectedBoard.columns);
    }
  }, [mode, selectedBoard]);

  const addNewBoard = async (name, token, columns) => {
    const response = await fetch(`${import.meta.env.VITE_SOME_SERVER}/boards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify({ name, columns }),
    });

    if (response.ok) {
      const board = await response.json();
      showAlert("Board created successfully", "success");
      getBoards(token);
      return board;
    } else {
      showAlert("Error creating board", "error");
    }
  };

  const updateBoard = async (id, name, token, columns) => {
    const response = await fetch(
      `${import.meta.env.VITE_SOME_SERVER}/boards/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ name, columns }),
      }
    );

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    const board = await response.json();
    return board;
  };

  const addNewColumn = () => {
    setBoardColumns([...boardColumns, { status: "" }]);
  };

  const removeColumn = (index) => {
    setBoardColumns(boardColumns.filter((boardColumn, i) => i !== index));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (mode === "edit") {
      await updateBoard(selectedBoard.id, boardName, token, boardColumns);
      getBoards(token);
    } else {
      const board = await addNewBoard(boardName, token, boardColumns);
      setChosenBoardId(board.id)
      getBoards(token);
    }
  };

  const handleBoardColumnChange = (index) => (event) => {
    const newBoardColumns = [...boardColumns];
    newBoardColumns[index].status = event.target.value;
    setBoardColumns(newBoardColumns);
  };

  return (
    <Card showShadow={true}>
      <div className="card-header">
        <h3>{mode ? "Edit" : "Add New"} board</h3>
        <img className="cross" onClick={() => showForm()} src={Cross} alt="X" />
      </div>
      <form action="submit">
        <label htmlFor="name">
          Board Name
          <Input
            placeholder="e.g. Web Design"
            autoComplete="on"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            required
          />
        </label>
        <label>
          Board Columns
          {boardColumns.map((boardColumn, index) => (
            <div className="subtask" key={index}>
              <Input
                placeholder="status"
                value={boardColumn.status}
                onChange={handleBoardColumnChange(index)}
                required
              />
              <img
                className="cross"
                onClick={() => removeColumn(index)}
                src={Cross}
                alt="X"
              />
            </div>
          ))}
        </label>
        <Button
          textColor="#635FC7"
          color={`${darkMode ? "white" : "#635FC71A"}`}
          onClick={addNewColumn}
        >
          +Add New Column
        </Button>
        <Button
          disabled={!boardName}
          onClick={() => {
            handleSubmit();
            showForm();
          }}
        >
          {mode ? "Edit" : "Create New"} Board
        </Button>
      </form>
    </Card>
  );
};

export default BoardForm;
