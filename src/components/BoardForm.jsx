import Card from "./Card";
import Cross from "../assets/icon-cross.svg";
import Button from "./Button";
import Input from "./Input";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const BoardForm = ({ formHeading, showForm, setBoardName, boardName }) => {
  const [boardColumns, setBoardColumns] = useState(["TODO", "DOING", "DONE"]);

  const addNewBoard = async (name,  token, columns) => {
    const response = await fetch("http://localhost:3000/boards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${token}`
      },
      body: JSON.stringify({ name, columns }),
    });

    if (response.ok) {
      const board = await response.json();
      console.log("Board created:", board);
    } else {
      console.log("Error creating board:", response.status);
    }
  };

  const addNewColumn = () => {
    setBoardColumns([...boardColumns, ""]);
  };

  const removeColumn = (index) => {
    setBoardColumns(boardColumns.filter((boardColumn, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token')
    addNewBoard(boardName,token, boardColumns);
  };

  const handleBoardColumnChange = (index) => (event) => {
    const newBoardColumns = [...boardColumns];
    newBoardColumns[index] = event.target.value;
    setBoardColumns(newBoardColumns);
  };

  return (
    <Card showShadow={true}>
      <div className="card-header">
        <h3>{formHeading}</h3>
        <img onClick={() => showForm(false)} src={Cross} alt="X" />
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
                value={boardColumns[index]}
                onChange={handleBoardColumnChange(index)}
                required
              />
              <img onClick={() => removeColumn(index)} src={Cross} alt="X" />
            </div>
          ))}
        </label>
        <Button
          textColor="#635FC7"
          color={"rgba(99, 95, 199, 0.10)"}
          onClick={addNewColumn}
        >
          +Add New Column
        </Button>
        <Button
          disabled={!boardName}
          onClick={(e) => {
            handleSubmit(e);
            showForm(false);
          }}
        >
          Create New Board
        </Button>
      </form>
    </Card>
  );
};

export default BoardForm;
