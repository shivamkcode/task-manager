/* eslint-disable react/prop-types */
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Button from "./Button";
import { useState } from "react";
import Card from "./Card";
import Dots from "../assets/icon-vertical-ellipsis.svg";
import Checkbox from "./Checkbox";
import TaskForm from "./TaskForm";
import DeleteConfirm from "./DeleteConfirm";

// eslint-disable-next-line react/prop-types
const Board = ({ selectedColumns, tasks, setTasks, boardId }) => {
  const [taskDetails, setTaskDetails] = useState(false);
  const [showTaskEditOption, setShowTaskEditOption] = useState(false);
  const [showTaskEditForm, setShowTaskEditForm] = useState(false);
  const [showTaskDeleteForm, setShowTaskDeleteForm] = useState(false);
  const handleNewColumn = () => {};

  const handleDragEnd = async (result) => {
    // eslint-disable-next-line no-unused-vars
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    const startTasks = Array.from(tasks[source.droppableId] || []);
    const finishTasks = Array.from(tasks[destination.droppableId] || []);

    // Moving inside the same list
    if (source.droppableId === destination.droppableId) {
      const [removed] = startTasks.splice(source.index, 1);
      startTasks.splice(destination.index, 0, removed);

      setTasks((prevTasks) => ({
        ...prevTasks,
        [source.droppableId]: startTasks,
      }));
    } else {
      // Moving from one list to another
      const [removed] = startTasks.splice(source.index, 1);
      finishTasks.splice(destination.index, 0, removed);

      setTasks((prevTasks) => ({
        ...prevTasks,
        [source.droppableId]: startTasks,
        [destination.droppableId]: finishTasks,
      }));

      //     const response = await fetch(`http://localhost:3000//tasks/${draggableId}`, {
      //       method: "PUT",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify({
      //         status: destination.droppableId,
      //       }),
      //     });
      //     if (!response.ok) {
      //       throw new Error(`HTTP error! status: ${response.status}`);
      //     }
    }
  };

  const handleStatusChange = () => {};

  console.log(tasks);
  return (
    <div className="board">
      {selectedColumns?.length > 0 && (
        <div className="column-container">
          <DragDropContext onDragEnd={handleDragEnd}>
            {selectedColumns?.map((column, i) => (
              <Droppable droppableId={column?.status} key={i}>
                {(provided) => (
                  <div
                    className="columns"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <div className="column-status">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                      >
                        <circle
                          cx="7.5"
                          cy="7.5"
                          r="7.5"
                          fill={
                            column.status === "TODO"
                              ? "#49C4E5"
                              : column.status === "DOING"
                              ? "#8471F2"
                              : column.status === "DONE"
                              ? "#67E2AE"
                              : "#49C4E5"
                          }
                        />
                      </svg>
                      <h6>{column.status}</h6>
                    </div>
                    {tasks
                      ?.filter((task) => task.status === column.status)
                      .map((task, index) => (
                        <Draggable
                          draggableId={task?.id + ""}
                          index={index}
                          key={task.id}
                        >
                          {(provided) => (
                            <>
                              <div
                                onClick={() => setTaskDetails(true)}
                                className="task-box"
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                              >
                                <h3>{task.title}</h3>
                                <span>
                                  0 of {task.subtasks.length} subtasks
                                </span>
                              </div>
                              {taskDetails && (
                                <Card showShadow={true}>
                                  <div className="task-details">
                                    <div className="card-header">
                                      <h3>{task.title}</h3>
                                      <img
                                        onClick={() =>
                                          setShowTaskEditOption(
                                            !showTaskEditOption
                                          )
                                        }
                                        src={Dots}
                                        alt="dots"
                                      />
                                    </div>
                                    {showTaskEditOption && (
                                      <div className="edit-option">
                                        <span
                                          onClick={() =>
                                            setShowTaskEditForm(true)
                                          }
                                        >
                                          Edit Task
                                        </span>
                                        {showTaskEditForm && (
                                          <TaskForm
                                            heading={"Edit"}
                                            showForm={setShowTaskEditForm}
                                            boardId={boardId}
                                          />
                                        )}
                                        <span
                                          onClick={() =>
                                            setShowTaskDeleteForm(true)
                                          }
                                          style={{ color: "red" }}
                                        >
                                          Delete Task
                                        </span>
                                        {showTaskDeleteForm && (
                                          <DeleteConfirm
                                            text="task"
                                            name={task.title}
                                            showForm={setShowTaskDeleteForm}
                                          />
                                        )}
                                        <span
                                          onClick={() => {
                                            setTaskDetails(false);
                                            setShowTaskEditOption(
                                              !showTaskEditOption
                                            );
                                          }}
                                        >
                                          Close
                                        </span>
                                      </div>
                                    )}
                                    <p>{task.description}</p>
                                    <h6>
                                      Subtasks(0 of {task.subtasks.length})
                                    </h6>
                                    {task.subtasks.map((subtask, i) => (
                                      <Checkbox key={i}>
                                        {subtask.title}
                                      </Checkbox>
                                    ))}
                                    <h6>Current Status</h6>
                                    <select
                                      name="Status"
                                      value={task.status}
                                      onChange={handleStatusChange}
                                      required
                                    >
                                      <option value="TODO">Todo</option>
                                      <option value="DOING">Doing</option>
                                      <option value="DONE">Done</option>
                                    </select>
                                    <Button>Submit Changes</Button>
                                  </div>
                                </Card>
                              )}
                            </>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </DragDropContext>
          {/* <div className="columns">
            <h2> +New Column</h2>
          </div> */}
        </div>
      )}
      {selectedColumns === undefined && (
        <div className="empty-board">
          <p>This board is empty. Create a new column to get started</p>
          <Button onClick={handleNewColumn}>+Add New Column</Button>
        </div>
      )}
    </div>
  );
};

export default Board;
