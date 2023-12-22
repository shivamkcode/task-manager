import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Button from "./Button";

const Board = () => {
  const [tasks, setTasks] = useState([]);

  // const getAllTasks = async () => {
  //   const response = await fetch("http://localhost:3000/tasks");

  //   if (response.ok) {
  //     const tasks = await response.json();
  //     console.log("Tasks:", tasks);
  //   } else {
  //     console.log("Error getting tasks:", response.status);
  //   }
  // };

  // useEffect(() => {
  //   getAllTasks();
  // }, []);

  const handleNewColumn = () => {};

  const handleDragEnd = (result) => {
    // eslint-disable-next-line no-unused-vars
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    const startTasks = Array.from(tasks[source.droppableId]);
    const finishTasks = Array.from(tasks[destination.droppableId]);

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
    }
  };

  return (
    <div className="board">
      {tasks.length > 0 && (
        <>
          <DragDropContext onDragEnd={handleDragEnd}>
            {Object.entries(tasks).map(([columnId, tasks]) => (
              <Droppable droppableId={columnId} key={columnId}>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {tasks.map((task, index) => (
                      <Draggable
                        draggableId={task.id}
                        index={index}
                        key={task.id}
                      >
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            {task.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </DragDropContext>
          <h2> +New Column</h2>
        </>
      )}
      {tasks.length === 0 && (
        <div className="empty-board">
          <p>This board is empty. Create a new column to get started</p>
          <Button onClick={handleNewColumn}>+Add New Column</Button>
        </div>
      )}
    </div>
  );
};

export default Board;
