/* eslint-disable react/prop-types */
import Button from "./Button";
import Card from "./Card";
import Cross from "../assets/icon-cross.svg";
import Input from "./Input";
import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
const TaskForm = ({
  boardId,
  showForm,
  getBoards,
  selectedColumns,
  selectedTask,
  id,
  mode,
  updateTask,
}) => {
  const [task, setTask] = useState({
    heading: "Add New",
    newTask: {
      title: "",
      description: "",
      status: "TODO",
    },
    subTasks: [
      {
        title: "",
        completed: false,
      },
      {
        title: "",
        completed: false,
      },
    ],
    columns: selectedColumns,
  });

  useEffect(() => {
    if (mode === "edit") {
      setTask({
        heading: "Edit",
        newTask: selectedTask,
        subTasks: selectedTask.subtasks,
        columns: selectedColumns,
      });
    }
  }, [mode, selectedTask, selectedColumns]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (mode === "edit") {
      await updateTask(
        id,
        task.newTask.title,
        task.newTask.description,
        task.newTask.status,
        task.subTasks
      );
      getBoards(token);
    } else {
      await addNewTask(
        task.newTask.title,
        task.newTask.description,
        task.newTask.status,
        boardId,
        task.subTasks
      );
      getBoards(token);
      setTask({
        heading: "Add New",
        newTask: {
          title: "",
          description: "",
          status: "TODO",
        },
        subTasks: [
          {
            title: "",
            completed: false,
          },
          {
            title: "",
            completed: false,
          },
        ],
      });
    }
  };

  const addSubTask = () => {
    setTask({
      ...task,
      subTasks: [
        ...task.subTasks,
        {
          title: "",
          completed: false,
        },
      ],
    });
  };

  const removeSubTask = (index) => {
    setTask({
      ...task,
      subTasks: [...task.subTasks.filter((subTask, i) => i !== index)],
    });
  };

  const handleTaskDetailUpdate = async (data, name) => {
    const _task = { ...task };
    switch (name) {
      case "title":
        _task.newTask.title = data;
        break;
      case "description":
        _task.newTask.description = data;
        break;
      case "status":
        _task.newTask.status = data;
        break;
      case "subtasks": {
        const newSubTasks = [...task.subTasks];
        newSubTasks[data.index].title = data.value;
        _task.subTasks = newSubTasks;
        break;
      }
      default:
        break;
    }
    setTask(_task);
  };

  return (
    <Card showShadow={true}>
      <div className="card-header">
        <h3>{task.heading} Task</h3>
        <img onClick={() => showForm()} src={Cross} alt="" />
      </div>
      <form action="submit">
        <label>
          Title
          <Input
            autoComplete={"on"}
            placeholder={"e.g. take coffee break"}
            value={task.newTask.title}
            onChange={(e) => handleTaskDetailUpdate(e.target.value, "title")}
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
            value={task.newTask.description}
            onChange={(e) =>
              handleTaskDetailUpdate(e.target.value, "description")
            }
            required
          />
        </label>
        <label>
          Subtasks
          {task.subTasks.map((subTask, index) => (
            <div className="subtask" key={index}>
              <Input
                placeholder={`e.g. Subtask ${index + 1}`}
                value={subTask.title}
                onChange={(e) => {
                  handleTaskDetailUpdate(
                    { value: e.target.value, index },
                    "subtasks"
                  );
                }}
              />
              <img onClick={() => removeSubTask(index)} src={Cross} alt="X" />
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
            value={task.newTask.status}
            onChange={(e) => handleTaskDetailUpdate(e.target.value, "status")}
            required
          >
            {task.columns.map((column) => {
              return (
                <option key={column.id} value={column.status}>
                  {column.status}
                </option>
              );
            })}
          </select>
        </label>
        <Button
          disabled={
            !task.newTask.title ||
            !task.newTask.description ||
            !task.subTasks.every((subTask) => subTask.title !== "")
          }
          onClick={(e) => {
            showForm();
            handleSubmit(e);
          }}
          type="button"
        >
          {mode === "edit" ? "Edit Task" : "Create Task"}
        </Button>
      </form>
    </Card>
  );
};

export default TaskForm;
