/* eslint-disable react/prop-types */
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Button from "./Button";
import { useEffect, useState } from "react";
import Card from "./Card";
import Dots from "../assets/icon-vertical-ellipsis.svg";
import Checkbox from "./Checkbox";
import TaskForm from "./TaskForm";
import DeleteConfirm from "./DeleteConfirm";
import BoardForm from "./BoardForm";
import sampleData from "../data.json";

// eslint-disable-next-line react/prop-types
const Board = ({
  boardId,
  boards,
  selectedColumns,
  boardName,
  isOpen,
  setIsOpen,
  getBoards,
  setChosenBoardId,
  sidebarVisible,
  getUser,
  windowWidth,
  darkMode,
  showAlert,
  updateUser
}) => {
  const [taskDetails, setTaskDetails] = useState(false);
  const [showTaskEditOption, setShowTaskEditOption] = useState(false);
  const [showTaskEditForm, setShowTaskEditForm] = useState(false);
  const [showTaskDeleteForm, setShowTaskDeleteForm] = useState(false);
  const [tasks, setTasks] = useState(
    boards?.find((board) => board.id === boardId)?.tasks || []
  );
  const [selectedTask, setSelectedTask] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    getUser(token);
    checkAndCreateSampleBoard(token);
    getBoards(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAndCreateSampleBoard = async (token) => {
    const user = await getUser(token);
    if (!user.sampleBoardsCreated) {
      const response = await fetch(
        `${import.meta.env.VITE_SOME_SERVER}/boards`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );
      const boards = await response.json();
      sampleData.sampleData.forEach(async (sampleBoard) => {
        const sampleBoardExists = boards.some(
          (board) => board.name === sampleBoard.name
        );
        if (!sampleBoardExists) {
          const createdBoard = await addNewBoard(
            sampleBoard.name,
            token,
            sampleBoard.columns
          );
          await addSampleTasks(createdBoard.id, token, sampleBoard.columns);
        }
      });
      await updateUser(user.id, {sampleBoardsCreated: true}, token);
    }
  };

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

  const addSampleTasks = async (boardId, token, columns) => {
    for (const column of columns) {
      for (const task of column.tasks) {
        await addNewTask(
          task.title,
          task.description,
          column.status,
          boardId,
          task.subtasks,
          token
        );
      }
    }
  };

  const addNewTask = async (
    title,
    description,
    status,
    boardId,
    subTasks,
    token
  ) => {
    const response = await fetch(`${import.meta.env.VITE_SOME_SERVER}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify({ title, description, status, boardId, subTasks }),
    });
    if (response.ok) {
      showAlert("Task created successfully", "success");
    } else {
      showAlert("Error creating task", "error");
    }
  };

  const updateTask = async (id, title, description, status, subTasks) => {
    const response = await fetch(
      `${import.meta.env.VITE_SOME_SERVER}/tasks/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, status, subTasks }),
      }
    );
    if (response.ok) {
      // const task = await response.json();
      showAlert("Task updated successfully", "success");
    } else {
      showAlert("Error updating task", "error");
    }
  };

  const updateTaskDetails = async () => {
    await updateTask(
      selectedTask.id,
      selectedTask.title,
      selectedTask.description,
      selectedTask.status,
      selectedTask.subtasks
    );

    const _tasks = tasks.filter((task) => task.id !== selectedTask.id);
    const newTask = tasks.find((task) => task.id === selectedTask.id);
    if (newTask) {
      newTask.title = selectedTask.title;
      newTask.description = selectedTask.description;
      newTask.status = selectedTask.status;
      newTask.subtasks = newTask.subtasks.map((subtask) => ({
        ...subtask,
        completed: selectedTask.subtasks.find((st) => st.id === subtask.id)
          .completed,
      }));

      setTasks([..._tasks, newTask]);
      setSelectedTask({});
    }
  };

  const handleDragEnd = async (result) => {
    const { destination, draggableId } = result;
    if (!destination) {
      return;
    }

    const draggedTask = tasks.find((task) => task.id === parseInt(draggableId));
    const newColumn = selectedColumns.find(
      (col) => col.id === parseInt(destination.droppableId)
    );

    if (draggedTask && newColumn) {
      draggedTask.status = newColumn.status;

      const newTasks = tasks.filter((task) => task.id !== draggedTask.id);

      newTasks.splice(destination.index, 0, draggedTask);

      setTasks(newTasks);

      await updateTask(
        draggedTask.id,
        draggedTask.title,
        draggedTask.description,
        draggedTask.status,
        draggedTask.subtasks
      );
    }
  };

  useEffect(() => {
    setTasks(boards?.find((board) => board.id === boardId)?.tasks || []);
  }, [boardId, boards]);

  return (
    <div className={`board ${sidebarVisible ? "" : "noSideBar-board"}`}>
      {selectedColumns.length > 0 && (
        <div className="column-container">
          <DragDropContext onDragEnd={handleDragEnd}>
            {selectedColumns
              ?.sort((a, b) => a.id - b.id)
              .map((column) => (
                <Droppable droppableId={column.id.toString()} key={column.id}>
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
                        .filter((task) => task.status === column.status)
                        .map((task, index) => (
                          <Draggable
                            draggableId={task.id.toString()}
                            index={index}
                            key={task.id}
                          >
                            {(provided) => (
                              <>
                                <div
                                  onClick={() => {
                                    setTaskDetails(true);
                                    setSelectedTask(task);
                                  }}
                                  className="task-box"
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                >
                                  <h3>{task.title}</h3>
                                  <span>
                                    {
                                      task.subtasks.filter(
                                        (subtask) => subtask.completed
                                      ).length
                                    }{" "}
                                    of {task.subtasks.length} subtasks
                                  </span>
                                </div>
                                {taskDetails && selectedTask.id === task.id && (
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
                                      <p>{task.description}</p>
                                      {showTaskEditOption && (
                                        <div className="edit-option">
                                          <span
                                            onClick={() => {
                                              setTaskDetails(false);
                                              setShowTaskEditOption(false);
                                              setShowTaskEditForm(true);
                                            }}
                                          >
                                            Edit Task
                                          </span>

                                          <span
                                            onClick={() => {
                                              setShowTaskEditOption(false);
                                              setTaskDetails(false);
                                              setShowTaskDeleteForm(true);
                                            }}
                                            style={{ color: "red" }}
                                          >
                                            Delete Task
                                          </span>

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
                                      {task.subtasks && (
                                        <label>
                                          Subtasks (
                                          {
                                            task.subtasks.filter(
                                              (subtask) => subtask.completed
                                            ).length
                                          }{" "}
                                          of {task.subtasks.length})
                                          {selectedTask.subtasks.map(
                                            (subtask, i) => (
                                              <Checkbox
                                                key={i}
                                                initialChecked={
                                                  subtask.completed
                                                }
                                                onCheckboxChange={() => {
                                                  const updatedSubtasks =
                                                    selectedTask.subtasks.map(
                                                      (st) => {
                                                        if (st === subtask) {
                                                          return {
                                                            ...st,
                                                            completed:
                                                              !st.completed,
                                                          };
                                                        } else {
                                                          return st;
                                                        }
                                                      }
                                                    );

                                                  setSelectedTask({
                                                    ...selectedTask,
                                                    subtasks: updatedSubtasks,
                                                  });
                                                }}
                                              >
                                                {subtask.title}
                                              </Checkbox>
                                            )
                                          )}
                                        </label>
                                      )}
                                      <label>
                                        Current Status
                                        <select
                                          name="Status"
                                          value={selectedTask.status}
                                          onChange={(e) =>
                                            setSelectedTask({
                                              ...selectedTask,
                                              status: e.target.value,
                                            })
                                          }
                                          required
                                        >
                                          {selectedColumns.map((column) => {
                                            return (
                                              <option
                                                key={column.id}
                                                value={column.status}
                                              >
                                                {column.status}
                                              </option>
                                            );
                                          })}
                                        </select>
                                      </label>
                                      <Button onClick={updateTaskDetails}>
                                        Submit Changes
                                      </Button>
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
          <div className="columns new-column">
            <h3 onClick={() => setIsOpen({ editBoardForm: true })}>
              + New Column
            </h3>
          </div>
        </div>
      )}
      {sidebarVisible && windowWidth < 600 && (
        <div
          style={{
            position: "absolute",
            top: "90px",
            left: 0,
            width: "100vw",
            height: "calc(100vh - 90px)",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: "999",
          }}
        />
      )}
      {isOpen.addBoard && (
        <BoardForm
          showAlert={showAlert}
          getBoards={getBoards}
          showForm={() => setIsOpen({ addBoard: false })}
          darkMode={darkMode}
          id={boardId}
          setChosenBoardId={setChosenBoardId}
        />
      )}
      {isOpen.editBoardForm && (
        <BoardForm
          selectedBoard={boards?.find((board) => board.id === boardId)}
          mode="edit"
          showForm={() => setIsOpen({ editBoardForm: false })}
          getBoards={getBoards}
          darkMode={darkMode}
          showAlert={showAlert}
        />
      )}
      {selectedColumns.length === 0 && boards?.length > 0 && (
        <div className="empty-board">
          <p>This board is empty. Create a new column to get started.</p>
          <Button onClick={() => setIsOpen({ editBoardForm: true })}>
            +Create New Column
          </Button>
        </div>
      )}
      {boards?.length === 0 && (
        <div className="empty-board">
          <p>Create a new board to get started.</p>
          <Button onClick={() => setIsOpen({ addBoard: true })}>
            +Create New Board
          </Button>
        </div>
      )}
      {isOpen.showTaskForm && (
        <TaskForm
          showAlert={showAlert}
          selectedColumns={selectedColumns}
          getBoards={getBoards}
          boardId={boardId}
          mode=""
          showForm={() => setIsOpen({ showTaskForm: false })}
          darkMode={darkMode}
        />
      )}
      {showTaskEditForm && (
        <TaskForm
          showAlert={showAlert}
          updateTask={updateTask}
          showForm={setShowTaskEditForm}
          boardId={boardId}
          getBoards={getBoards}
          mode="edit"
          selectedTask={selectedTask}
          id={selectedTask.id}
          selectedColumns={selectedColumns}
          darkMode={darkMode}
        />
      )}
      {showTaskDeleteForm && (
        <DeleteConfirm
          showAlert={showAlert}
          text="task"
          getBoards={getBoards}
          name={selectedTask.title}
          id={selectedTask.id}
          hideForm={() => {
            setTaskDetails(false);
            setShowTaskDeleteForm(false);
          }}
        />
      )}
      {isOpen.deleteBoardForm && (
        <DeleteConfirm
          showAlert={showAlert}
          text="board"
          name={boardName}
          setChosenBoardId={setChosenBoardId}
          id={boardId}
          getBoards={getBoards}
          hideForm={() => setIsOpen({ deleteBoardForm: false })}
          boards={boards}
        />
      )}
      {isOpen.showEditBoard && (
        <div className="edit-option">
          <span onClick={() => setIsOpen({ editBoardForm: true })}>
            Edit Board
          </span>
          <span
            onClick={() => setIsOpen({ deleteBoardForm: true })}
            style={{ color: "red" }}
          >
            Delete Board
          </span>
        </div>
      )}
    </div>
  );
};

export default Board;
