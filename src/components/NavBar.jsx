/* eslint-disable react/prop-types */
import { useState } from "react";
import dots from "../assets/icon-vertical-ellipsis.svg";
import Logo from "../assets/logo-light.svg";
import Cross from "../assets/icon-cross.svg";
import Input from "./Input";
import Card from "./Card";
import Button from "./Button";

const NavBar = ({ isOpen, sidebarVisible }) => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [subTasks, setSubTasks] = useState(["", ""]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "",
  });

  const addNewTask = async (title, description, boardId) => {
    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, boardId }),
    });
  
    if (response.ok) {
      const task = await response.json();
      console.log("Task created:", task);
    } else {
      console.log("Error creating task:", response.status);
    }
  };

  const addNewSubtask = async (title, taskId) => {
    const response = await fetch("http://localhost:3000/subtasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, taskId }),
    });
  
    if (response.ok) {
      const subtask = await response.json();
      console.log("Subtask created:", subtask);
    } else {
      console.log("Error creating subtask:", response.status);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addNewTask(newTask.title, newTask.description, newTask.status)
    addNewSubtask(subTasks.title);
    console.log(newTask);
    console.log(subTasks);
  };

  const addSubTask = () => {
    setSubTasks([...subTasks, ""]);
  };

  const removeSubTask = (index) => {
    setSubTasks([...subTasks.filter((subTask, i) => i !== index)]);
  };

  return (
    <nav className="nav">
      {!sidebarVisible && <img src={Logo} alt="logo" />}
      <h2>Board Name</h2>
      <Button disabled={showTaskForm} onClick={() => setShowTaskForm(true)}>+Add New task</Button>
      {showTaskForm && (
        <Card showShadow={true} isOpen={isOpen}>
          <div className="card-header">
          <h3>Add New Task</h3>
          <img onClick={() => setShowTaskForm(false)} src={Cross} alt="" />
          </div>
          <form action="submit">
            <label>
              Title
              <Input
                autoComplete={"on"}
                placeholder={"e.g. take coffee break"}
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
                required = {true}
              />
            </label>
            <label htmlFor="Description">
              Description
              <textarea
                id="Description"
                name="Description"
                rows={4}
                placeholder="e.g. Its always good to take a break. This 15 minute break will 
recharge the batteries a little."
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
                required
              />
            </label>
            <label>
              Subtasks
              {subTasks.map((subTask, index) => (
                <div className="subtask" key={index}>
                  <Input
                    placeholder={`e.g. Subtask ${index + 1}`}
                    value={subTasks[index]}
                    onChange={(e) => {
                      const newSubTasks = [...subTasks];
                      newSubTasks[index] = e.target.value;
                      setSubTasks(newSubTasks);
                    }}
                  />
                  <img
                    onClick={() => removeSubTask(index)}
                    src={Cross}
                    alt="X"
                  />
                </div>
              ))}
            </label>
            <Button onClick={addSubTask}>
              +Add New Subtask
            </Button>
            <label htmlFor="Status">
              Status
              <select
                id="Status"
                name="Status"
                value={newTask.status}
                onChange={(e) =>
                  setNewTask({ ...newTask, status: e.target.value })
                }
                required
              >
                <option value="todo">Todo</option>
                <option value="doing">Doing</option>
                <option value="completed">Completed</option>
              </select>
            </label>
            <Button disabled={!newTask.title || !newTask.description} onClick={handleSubmit}>Create Task</Button>
          </form>
        </Card>
      )}
      <img src={dots} alt="dots" />
      <div style={{ display: "none" }}>
        <span>Edit Board</span>
        <span style={{ color: "red" }}>Delete Board</span>
      </div>
    </nav>
  );
};

export default NavBar;
