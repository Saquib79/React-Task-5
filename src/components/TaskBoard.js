import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './TaskBoard.css';

// Initial Task Data
const initialTasks = [
  { id: 'task-1', content: 'Test Task 1' },
  { id: 'task-2', content: 'Test Task 2' },
  { id: 'task-3', content: 'Test Task 3' },
  { id: 'task-4', content: 'Test Task 4' },
  { id: 'task-5', content: 'Test Task 5' },
  { id: 'task-6', content: 'Test Task 6' },
  { id: 'task-7', content: 'Test Task 7' },
  { id: 'task-8', content: 'Test Task 8' },
  { id: 'task-9', content: 'Test Task 9' },
  { id: 'task-10', content: 'Test Task 10' },
];

// Initial Columns Setup
const initialColumns = {
  unplanned: {
    name: 'Unplanned',
    items: initialTasks,
  },
  today: {
    name: 'Today',
    items: [],
  },
  tomorrow: {
    name: 'Tomorrow',
    items: [],
  },
  'this-week': {
    name: 'This Week',
    items: [],
  },
  'next-week': {
    name: 'Next Week',
    items: [],
  },
};

const TaskBoard = () => {
  const [columns, setColumns] = useState(initialColumns);

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      // Moving between columns
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      // Moving within the same column
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  return (
    <div className="task-board">
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div className="column" key={columnId}>
              <h2>{column.name}</h2>
              <Droppable droppableId={columnId} key={columnId}>
                {(provided, snapshot) => (
                  <div
                    className={`task-list ${
                      snapshot.isDraggingOver ? 'dragging-over' : ''
                    }`}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {column.items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            className={`task-item ${
                              snapshot.isDragging ? 'dragging' : ''
                            }`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {item.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
};

export default TaskBoard;