import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialTasks = {
  'todo': [
    { id: '1', content: 'Task 1' },
    { id: '2', content: 'Task 2' }
  ],
  'doing': [
    { id: '3', content: 'Task 3' },
    { id: '4', content: 'Task 4' }
  ],
  'done': []
};

const Board = () => {
  const [tasks, setTasks] = useState(initialTasks);

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
  
      setTasks(prevTasks => ({
        ...prevTasks,
        [source.droppableId]: startTasks,
      }));
    } else {
      // Moving from one list to another
      const [removed] = startTasks.splice(source.index, 1);
      finishTasks.splice(destination.index, 0, removed);
  
      setTasks(prevTasks => ({
        ...prevTasks,
        [source.droppableId]: startTasks,
        [destination.droppableId]: finishTasks,
      }));
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {Object.entries(tasks).map(([columnId, tasks]) => (
        <Droppable droppableId={columnId} key={columnId}>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tasks.map((task, index) => (
                <Draggable draggableId={task.id} index={index} key={task.id}>
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
  );
};

export default Board;
