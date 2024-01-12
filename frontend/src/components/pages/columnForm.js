

import { SortableContext, useSortable } from "@dnd-kit/sortable";
import TrashIcon from "../icons/TrashIcon";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
// import PlusIcon from "../icons/PlusIcon";
import TaskForm from "./taskForm";

function ColumnForm({
  column,
  deleteColumn,
  updateColumn,
  createTask,
  tasks,
  deleteTask,
  updateTask,
}) {
  const [editMode, setEditMode] = useState(true);
  const [mouseIsOver, setMouseIsOver] = useState(false);

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    
    transition,
    transform: CSS.Transform.toString(transform),
    backgroundColor:"#E0E0E0",
    // opacity: "0.4",
    borderWidth: "2px",
    borderColor: "pink",
    width:"250px",
    height: "800px",
    maxHeight: "500px",
    borderRadius:"15px",
    display:"flex",
    flexDirection: "column"
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
      bg-columnBackgroundColor
      opacity-40
      border-2
      border-pink-500
      w-[350px]
      h-[500px]
      max-h-[500px]
      rounded-md
      flex
      flex-col
      "
      
      >
      
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="
  bg-columnBackgroundColor
  w-[350px]
  h-[500px]
  max-h-[500px]
  rounded-md
  flex
  flex-col
  "
    >
      {/* Column title */}
      <div
        {...attributes}
        {...listeners}
        onClick={() => {
          setEditMode(true);
        }}
        style={{
          backgroundColor: "#161C22",
          fontSize: "1.25rem",
          height: "60px",
          width:"250px",
          cursor: "grab",
          borderRadius: "0.375rem",
          // border-bottom-left-radius: "0",
          // border-bottom-right-radius: 0

          padding: "0.75rem",
          fontWeight: "bold",
          borderColor: "#2ecc71",
          borderWidth: "0.25rem" ,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
 
        }}
        className="
      bg-mainBackgroundColor
      text-md
      h-[60px]
      cursor-grab
      rounded-md
      rounded-b-none
      p-3
      font-bold
      border-columnBackgroundColor
      border-4
      flex
      items-center
      justify-between
      "
      >
        <div className="flex gap-2"
        style={{ textAlign:"center",color:"#f2f2f2",textTransform: 'uppercase',width:"550px"}}>
          {/* <div
          style={{backgroundColor:"green"}}
            className="
        flex
        justify-center
        items-center
        
        px-2
        py-1
        text-sm
        rounded-full
        "
          >
            
          </div> */}
          {!editMode && column.title}
          {editMode && (
            <input
              className="bg-black focus:border-rose-500 border rounded outline-none px-2"
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => {
                setEditMode(true);
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
            />
          )}
        </div>
       
        <button
          onClick={() => {
            deleteColumn(column.id);
          }}
          style={{ width:"50px"}}
          onMouseEnter={() => {
            setMouseIsOver(true);
          }}
          onMouseLeave={() => {
            setMouseIsOver(false);
          }}
          className="
         silBtn
        stroke-gray-500
        hover:stroke-white
        hover:bg-columnBackgroundColor
        rounded
        
        "
        // px-1
        // py-2
        >
          <TrashIcon />
        
        </button>
    
      </div>

      {/* Column task container */}
      <div className=""
      style={{display:"flex",  flexDirection: "column",flexGrow: 1,gap: "1rem", padding: "0.5rem",overflowX: "hidden",  overflowY: "auto"}}
      >
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskForm
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>
      {/* Column footer */}
      <button
      style={{backgroundColor:"#f2f2f2",borderRadius:"8px"}}
      
        className="flex gap-2 items-center border-columnBackgroundColor border-2 rounded-md p-4 border-x-columnBackgroundColor hover:bg-mainBackgroundColor hover:text-rose-500 active:bg-black"
        onClick={() => {
          createTask(column.id);
        }}
      >
        {/* <PlusIcon /> */}
        TASK EKLE
        
      </button>
    </div>
  );
}

export default ColumnForm;


// import React, { useState } from 'react';

// const ColumnForm = ({ addColumn }) => {
//   const [columnName, setColumnName] = useState('');

//   const handleAddColumn = () => {
//     if (columnName.trim() !== '') {
//       addColumn({ id: Date.now(), name: columnName });
//       setColumnName('');
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Enter task name"
//         value={columnName}
//         onChange={(e) => setColumnName(e.target.value)}
//       />
//       <button onClick={handleAddColumn}>Add Column</button>
//     </div>
//   );
// };

// export default ColumnForm;

