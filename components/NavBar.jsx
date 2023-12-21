/* eslint-disable react/prop-types */
import { useState } from "react";
import dots from "../src/assets/icon-vertical-ellipsis.svg";
import Logo from "../src/assets/logo-light.svg";
import Cross from "../src/assets/icon-cross.svg";

const NavBar = ({ sidebarVisible }) => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [subTasks, setSubTasks] = useState(["", ""]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

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
    <nav>
      {!sidebarVisible && <img src={Logo} alt="logo" />}
      <h2>Board Name</h2>
      <button onClick={() => setShowTaskForm(true)}>+Add New task</button>
      {showTaskForm && (
        <div>
          <h3>Add New Task</h3>
          <img onClick={() => setShowTaskForm(false)} src={Cross} alt="" />
          <form action="submit">
            <label htmlFor="Title">
              Title
              <input
                type="text"
                id="Title"
                name="Title"
                autoComplete="on"
                placeholder="e.g. take coffee break"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
                required
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
                <div key={index}>
                  <input
                    type="text"
                    id={`Subtask-${index}`}
                    name={`Subtask-${index}`}
                    placeholder={`e.g. Subtask ${index + 1}`}
                    value={subTasks[index]}
                    onChange={(e) => {
                      const newSubTasks = [...subTasks];
                      newSubTasks[index] = e.target.value;
                      setSubTasks(newSubTasks);
                    }}
                    required
                  />
                  <img
                    onClick={() => removeSubTask(index)}
                    src={Cross}
                    alt="X"
                  />
                </div>
              ))}
            </label>
            <button type="button" onClick={addSubTask}>
              +Add New Subtask
            </button>
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
            <button onClick={handleSubmit}>Create Task</button>
          </form>
        </div>
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
