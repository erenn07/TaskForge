
ProjectManagement.js
import '../../App.css';
import {useNavigate} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Header from './componentss/header';

import TaskForm from './taskForm';
import ColumnForm from './columnForm';

function ProjectManagement() {
//   const [tasks, setTasks] = useState([]);
  const [tasks, setTasks] = useState([
    'task1',
    'task2',
    'task3'
    
    ]);
    const [columns, setColumns] = useState([
        'To Do',
        'In Progress',
        'Done'
        
        ]);

        useEffect(()=>{
            columns.forEach(column => {
                const columnElement = document.createElement('div');
          columnElement.textContent = column;
          columnElement.className = 'kanban-column';
          columnElement.setAttribute('draggable', 'true');

            })
        })
    useEffect(() => {
        tasks.forEach(task => {
          const taskElement = document.createElement('div');
          taskElement.textContent = task;
          taskElement.className = 'kanban-task';
          taskElement.setAttribute('draggable', 'true');
    
          
        //   const randomColumnId = ['todo-column', 'in-progress-column', 'done-column'][Math.floor(Math.random() * 3)];
        //   const column = document.getElementById(randomColumnId);
        //   column.appendChild(taskElement);
        });
    
        const draggables = document.querySelectorAll('.kanban-task');
        draggables.forEach(draggable => {
          draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
          });
    
          draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
          });
        });
    
        const containers = document.querySelectorAll('.kanban-column');
        containers.forEach(container => {
          container.addEventListener('dragover', e => {
            e.preventDefault();
            const afterElement = getDragAfterElement(container, e.clientY);
            const draggable = document.querySelector('.dragging');
            if (afterElement == null) {
              container.appendChild(draggable);
            } else {
              container.insertBefore(draggable, afterElement);
            }
          });
        });
      }, [tasks]);
      const getDragAfterElement = (container, y) => {
        const draggableElements = [...container.querySelectorAll('.kanban-task:not(.dragging)')];
    
        return draggableElements.reduce((closest, child) => {
          const box = child.getBoundingClientRect();
          const offset = y - box.top - box.height / 2;
          if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
          } else {
            return closest;
          }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
      };

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
   
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    
  };


  const addColumn = (newColumn) => {
    setColumns([...columns, newColumn]);
  
  };

  const deleteColumn= (columnId) => {
    const updatedColumns = columns.filter(columns => columns.id !== columnId);
    setColumns(updatedColumns);
  
  };

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
        <TaskForm addTask={addTask} />
        <ColumnForm addColumn={addColumn} />
        <div className="kanban-container">
      
        <div className="kanban-column" id="todo-column">
        <h2>To Do</h2>
          {tasks.map(task => (
            <div key={task.id} className="kanban-task" draggable>
              <span>{task.name}</span>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>

            
          ))}
        </div>


        <div className="kanban-column" id="in-progress-column">
        <h2>In Progress</h2>
          {tasks.map(task => (
            <div key={task.id} className="kanban-task" draggable>
              <span>{task.name}</span>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>

            
          ))}
        </div>


        <div className="kanban-column" id="done-column">
        <h2>Done</h2>
          {tasks.map(task => (
            <div key={task.id} className="kanban-task" draggable>
              <span>{task.name}</span>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>

            
          ))}
        </div>
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
}

export default ProjectManagement;
