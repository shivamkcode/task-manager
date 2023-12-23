import Button from './Button';
import Card from './Card';
import Cross from "../assets/icon-cross.svg";
import Input from "./Input";
import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const TaskForm = ({ boardId, showForm, heading }) => {

    const [subTasks, setSubTasks] = useState(["", ""]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "TODO",
  });

  const addNewTask = async (title, description, status, boardId, subTasks) => {
    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, status, boardId, subTasks }),
    });

    if (response.ok) {
      const task = await response.json();
      console.log("Task created:", task);
    } else {
      console.log("Error creating task:", response.status);
    }
  };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        addNewTask(
          newTask.title,
          newTask.description,
          newTask.status,
          boardId,
          subTasks
        );
        showForm(false);
        setNewTask({
          title: "",
          description: "",
          status: "TODO",
        });
        setSubTasks(['',''])
      };
    

    const addSubTask = () => {
        setSubTasks([...subTasks, ""])
      }
    
      const removeSubTask = (index) => {
        setSubTasks([...subTasks.filter((subTask, i) => i !== index)]);
      };

  return (
    <Card showShadow={true}>
          <div className="card-header">
            <h3>{heading} Task</h3>
            <img onClick={() => showForm(false)} src={Cross} alt="" />
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
                required={true}
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
            <Button
              textColor="#635FC7"
              color={"rgba(99, 95, 199, 0.10)"}
              onClick={addSubTask}
            >
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
                <option value="TODO">Todo</option>
                <option value="DOING">Doing</option>
                <option value="DONE">Done</option>
              </select>
            </label>
            <Button
              disabled={
                !newTask.title || !newTask.description || subTasks.includes("")
              }
              onClick={handleSubmit}
            >
              Create Task
            </Button>
          </form>
        </Card>
  )
}

export default TaskForm
