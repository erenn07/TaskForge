import logo from '../../../src/logo.svg';
import '../../App.css';
import {useNavigate,useLocation} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Header from './componentss/header';
import api from ".././../services/api.js"
import { useMemo } from "react";
import { Column, Id, Task } from "./types";
import ColumnForm from "./columnForm";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskForm from "./taskForm";


const defaultCols = [
  {
    id: "todo",
    title: "YAPILACAK",
  },
  {
    id: "doing",
    title: "İŞLEMDE",
  },
  {
    id: "done",
    title: "TAMAMLANDI",
  },
];

const defaultTasks = [

 ];



function generateId() {
  
  return Math.floor(Math.random() * 10001);
}

function ProjectManagement() {
    const location = useLocation();
    const projectId = location.state?.projectId;
  

    const [columns, setColumns] = useState(defaultCols);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const [tasks, setTasks] = useState(defaultTasks);

  const [activeColumn, setActiveColumn] = useState(null);
    const[taskData,setTaskData]=useState(null) 
  const [activeTask, setActiveTask] = useState(null);


  const getTask=async()=>{
    //console.log("get task front:",projectId)
    //const response = await api.task.getTask(projectId);
    //console.log("gelen cevap da bu:",response)
    
    //setTasks(response);
    
  }
  const getColumn=async()=>{
    //console.log("get task front:",projectId)
    //const response = await api.task.getTask(projectId);
    //console.log("gelen cevap da bu:",response)
    
    //setTasks(response);
    
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const  createTask= async (columnId)=>{
    const newTask = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
      projectId

    };

        api.task.addTask(newTask);
    setTasks([...tasks, newTask]);
  }
  const  getExistTask= async (columnId)=>{
    console.log("get task front:", projectId);
    const response = await api.task.getTask(projectId);
    console.log("gelen cevap da bu:", response);
  
    const newTasks = response.map((item) => ({
     id: generateId(),
      columnId: item.status,
      content: item.taskName,
      
    }));
  
    setTasks(newTasks);

  }


  const updateStatus = async (id, content, columnId) => {
    const taskToUpdate = tasks.find((task) => task.id === id);
    console.log(projectId + "update taskkkkkk");
    if (!taskToUpdate) {
      console.error('Güncellenecek görev bulunamadı.');
      return;
    }
  
    const updatedTask = {
      projectId,
      content, 
      status: columnId, 
    };
    console.log("Güncellenen Task: ", updatedTask); 

    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, ...updatedTask };
      }
      return task;
    });
  
    setTasks(updatedTasks);
  
    await api.task.updateTask(updatedTask);
  };

  //delete
  const deleteTask = async (id, content) => {
    try {
      const taskToDelete = tasks.find((task) => task.id === id);
  
      if (!taskToDelete) {
        console.error('Silinecek görev bulunamadı.');
        return;
      }
  
      const deletedTask = {
        projectId,
        content:taskToDelete.content
      };
  
      console.log("Silinecek Görev: ", deletedTask);
  
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
  
      await api.task.deleteTask(deletedTask); 
  
    } catch (error) {
      console.error("Görev silme hatası:", error);
    }
  };
  
  // const deleteeTask = async (id) => {
  //   const taskToDelete = tasks.find((task) => task.id === id);
    
  //   if (!taskToDelete) {
  //     console.error('Silinecek görev bulunamadı.');
  //     return;
  //   }
  
  //   const deletedTask = {
  //     projectId,
  //     content: taskToDelete.content,
  //     columnId: taskToDelete.columnId,
  //     status: taskToDelete.columnId, 
  //   };
  //   console.log("Silinen Task: ", deletedTask); 
  
  //   const updatedTasks = tasks.filter((task) => task.id !== id);
  
  //   setTasks(updatedTasks);
  
  //   await api.task.deleteTask(deletedTask);
  // };
  




    
  const updateTask = async (id, content, columnId) => {
    const taskToUpdate = tasks.find((task) => task.id === id);
    console.log(projectId + "update taskkkkkk");
    if (!taskToUpdate) {
      console.error('Güncellenecek görev bulunamadı.');
      return;
    }
  
    const updatedTask = {
      projectId,
      oldContent: taskToUpdate.content,
      content,
      columnId, 
      status: columnId, 
    };

    console.log("Güncellenen Task: ", updatedTask); 

    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, ...updatedTask };
      }
      return task;
    });
  
    setTasks(updatedTasks);
  
    await api.task.updateTask(updatedTask);
  };

  

  // const  deleteTask=async(id)=> {
  //   const newTasks = tasks.filter((task) => task.id !== id);
    
  //    api.task.deleteTask(id);
  //   setTasks(newTasks);
    
  // }

  const onDragOver = async (event) => {
    const { active, over } = event;
    if (!over) return;
  
    const activeId = active.id;
    const overId = over.id;
  
    if (activeId === overId) return;
  
    const isActiveATask = active.data.current?.type === "Task";
    const isOverAColumn = over.data.current?.type === "Column";
  
    if (isActiveATask && isOverAColumn) {
      let taskName = ""; 
  
      setTasks((tasks) => {
        const updatedTasks = tasks.map((task) => {
          if (task.id === activeId) {
            taskName = task.content; 
            return { ...task, columnId: overId };
          }
          return task;
        });
  
        const activeTask = updatedTasks.find((task) => task.id === activeId);
        let status = activeTask.columnId;
        console.log(status,"staa")
        console.log("Görevin yeni statusu:", activeTask.columnId);
  
        api.task.updateStatus(taskName, status, projectId);
        return updatedTasks;
      });
    }
  };
  function createNewColumn() {
    const columnToAdd = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
      columnName:`Column ${columns.length + 1}`,
    };

    api.column.addColumn(columnToAdd);
    setColumns([...columns, columnToAdd]);
  }

  const  getExistColumn = async ()=>{
    console.log("get column front:", projectId);
    const response = await api.column.getColumn(projectId);
    console.log("gelen cevap da bu:", response);
  
    const newColumns = response.map((item) => ({
     id: generateId(),
      columnId: item.status,
      title: item.columnName,
      
    }));
  
    setColumns([...defaultCols, ...newColumns]);

  }

  function deleteColumn(id) {
    const filteredColumns = columns.filter((col) => col.id !== id);
    api.column.deleteColumn(id);
    setColumns(filteredColumns);

    const newTasks = tasks.filter((t) => t.columnId !== id);
    setTasks(newTasks);
  }

  // function updateColumn(id, title) {
  //   const newColumns = columns.map((col) => {
  //     if (col.id !== id) return col;
  //     return { ...col, title };
  //   });
  //   api.column.updateColumn(newColumns) 
  //   setColumns(newColumns);
  
  //  }
  const updateColumn = async (id, title, columnId) => {
    const columnToUpdate = columns.find((column) => column.id === id);
    console.log(projectId + "update taskkkkkk");
    if (!columnToUpdate) {
      console.error('Güncellenecek görev bulunamadı.');
      return;
    }
  
    const updatedColumn = {
      projectId,
      oldTitle:columnToUpdate.title,
      title,
      columnId, 
      
    };

    console.log("Güncellenen Task: ", updatedColumn); 

    const updatedColumns = columns.map((column) => {
      if (column.id === id) {
        return { ...column, ...updatedColumn };
      }
      return column;
    });
  
    setColumns(updatedColumns);
  
    await api.column.updateColumn(updatedColumn);
  };

  useEffect(()=>{
    getTask();
    getExistColumn()
  },[projectId])

  useEffect(()=>{
    getExistTask();
    setActiveTask(tasks);
    

  },[])

  




  return (
   <>
   <div id="page-top"> 
    <div id="wrapper">


<ul class="navbar-nav bg-gradient-primary1 sidebar sidebar-dark accordion" id="accordionSidebar">

  
    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="Dashboard">
        <div class="sidebar-brand-icon ">
            <img src="./assets/img/logo.png"  ></img>
            {/* <i class="fas fa-laugh-wink"></i> */}
        </div>
        <div class="sidebar-brand-text mx-3"></div>
    </a>

    <hr class="sidebar-divider my-0"/>

           
            <li class="nav-item active">
                <a class="nav-link" href="index.html">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span></a>
            </li>

        
            <hr class="sidebar-divider"/>

           
            <div class="sidebar-heading">
               
            </div>

            <li class="nav-item">
                <a class="nav-link " href="/customers"  data-target="#collapseTwo"
                    aria-expanded="true" aria-controls="collapseTwo">
                    <i class="fas fa-fw fa-cog"></i>
                    <span>Müşteriler</span>
                </a>
             
            </li>

           
            <li class="nav-item">
                <a class="nav-link " href="/projectManagement" data-target="#collapseUtilities"
                    aria-expanded="true" aria-controls="collapseUtilities">
                    <i class="fas fa-fw fa-wrench"></i>
                    <span>Proje Yönetimi</span>
                </a>
               
            </li>



<li class="nav-item">
    <a class="nav-link " href="/businessRegistration"data-target="#collapsePages"
        aria-expanded="true" aria-controls="collapsePages">
        <i class="fas fa-fw fa-folder"></i>
        <span>İş Kaydı</span>
    </a>
   
</li>


<li class="nav-item">
    <a class="nav-link" href="/bills">
        <i class="fas fa-fw fa-chart-area"></i>
        <span>Faturalar</span></a>
</li>






</ul>
<div id="content-wrapper" class="d-flex flex-column">


<div id="content">

   
    <Header/>


    <div class="container-fluid">
  
      <div className="align-items-center mb-4">

    
    <div
      className="
        m-auto
        flex
        min-h-screen
        w-full
        items-center
        overflow-x-auto
        overflow-y-hidden
        px-[40px]
    "
    >
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        
      >
        <div className="m-auto flex gap-4 flex-row"style={{ justifyContent:"center",display: "flex",
  flexDirection: "row",
  gap: "4rem",}}>
          <div className="flex gap-4 "style={{ justifyContent:"center",display: "flex",
  flexDirection: "row",
  gap: "6rem",height:"16rem"}}  >
            <SortableContext items={columnsId}>
  {columns.map((col) => (
    <ColumnForm
      key={col.id}
      column={col}
      deleteColumn={deleteColumn}
      updateColumn={updateColumn}
      createTask={createTask}
      deleteTask={(taskId, content) => deleteTask(taskId, content, col.id)}
      updateTask={(taskId, content) => updateTask(taskId, content, col.id )}
      tasks={tasks.filter((task) => task.columnId === col.id)}
    />
  ))}
</SortableContext>

          </div>
          <button
            onClick={() => {
              createNewColumn();
            }}
            className="

      h-[30000px]
      w-[350px]
      min-w-[350px]
      cursor-pointer
      rounded-lg
      bg-mainBackgroundColor
      border-2
      border-columnBackgroundColor
      p-4
      ring-rose-500
      hover:ring-2
      flex
      gap-2
      "
      style={{color:"#f2f2f2"}}
          >
        Kolon Ekle
          </button> 
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnForm
              
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                //columns={columns.filter((column)=>column.id=== activeColumn.id)}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumn.id
                )}
              />
            )}
            {activeTask && (
              <TaskForm
                task={activeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
    </div>
    </div>
    </div>



</div>


</div>



<footer class="sticky-footer bg-white">
<div class="container my-auto">
    <div class="copyright text-center my-auto">
        <span>Copyright &copy; Your Website 2021</span>
    </div>
</div>
</footer>


</div>


   </>
   
  );

  function onDragStart(event) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;

    console.log("DRAG END");

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

 
  }

export default ProjectManagement;