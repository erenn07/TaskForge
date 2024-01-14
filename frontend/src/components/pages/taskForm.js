import { useState } from "react";
import TrashIcon from "../icons/TrashIcon";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { green, red } from "@mui/material/colors";
import api from "../../services/api.js"

function TaskForm({ task, deleteTask, updateTask }) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(true);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });

  const style = {
    
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
        opacity-30
      bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-rose-500  cursor-grab relative
      "
      />
    );
  }

  const handleEnterKey = (e) => {
    if (e && e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const newTaskContent = e.target.value;
      api.task.updateTask({ content: newTaskContent, projectId: task.projectId });

   
      updateTask(task.id, newTaskContent);
    }
  };

  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative"
      >
        <textarea
          className="
        h-[90%]
        w-full resize-none border-none rounded bg-transparent text-white focus:outline-none
        "
          value={task.content}
          autoFocus
          placeholder="Task content here"
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) {
              toggleEditMode();
            } else if (e.key === "Enter" && !e.shiftKey) {
              handleEnterKey();
            }
            // ...
          }}
          onChange={(e) => updateTask(task.id, e.target.value)}
        />
      </div>
    );
  }




  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={toggleEditMode}
      className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative task"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
    >
      <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap "style={{color:"#f2f2f2"}}>
        {task.content}
      </p>

      {mouseIsOver && (
        <button 
       
          onClick={() => {
            deleteTask(task.id);
          }}
          style={{width:40,height:40}}
          className="stroke-white absolute right-4 top-1/2 -translate-y-1/2 bg-columnBackgroundColor p-2 rounded opacity-60 hover:opacity-100" 
        >
          
         
          <TrashIcon />
        </button>
      )}
    </div>
  );
}

export default TaskForm;

