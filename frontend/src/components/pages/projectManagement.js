import React, { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import api from "../../services/api.js";
import Header from "./componentss/header.js";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { jwtDecode } from "jwt-decode";

function Projects() {
  const [rows, setRows] = useState([]);

  const navigate = useNavigate();

  function createData(ProjectName, CustomerName, projectId) {

    return { ProjectName, CustomerName, projectId };
  }

  const getProject = async () => {
    try {

      const userToken=localStorage.getItem('userToken')
      const user=jwtDecode(userToken)
      const creatorID=user.userId
      console.log("creator ıd bu:",creatorID)
      const response = await api.project.getProjects(creatorID);
      const userInfos = await Promise.all(
        response.map(async (item) => {
          const customerInfo = await api.user.getInfo(item.customer);
          return { projectName: item.projectName, customerInfo, projectId: item._id };
        })
      );

      const newRows = userInfos.map(({ projectName, customerInfo, projectId }) =>
        createData(projectName, `${customerInfo.firstName} ${customerInfo.lastName}`, projectId)
      );

      setRows(newRows);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }

  const handleRowClick = (projectId) => {
    console.log("Clicked Row, Project ID:", projectId); 
    navigate('/projectDetails', { state: { projectId } });
  };

  const onDeleteProject = async (projectId) => {
  console.log("ondelete projectID",projectId)
    await api.project.deleteProject(projectId);
    window.location.reload()
  };




  useEffect(() => {
    getProject();
  }, []);

    return(
        <>

<div id="page-top"> 
<div id="wrapper">


    <ul class="navbar-nav bg-gradient-primary1 sidebar sidebar-dark accordion" id="accordionSidebar">


    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="Dashboard">
        <div class="sidebar-brand-icon ">
            <img src="./assets/img/logo.png"  ></img>

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
            {/* <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <h6 class="collapse-header">Custom Components:</h6>
                    <a class="collapse-item" href="buttons.html">Buttons</a>
                    <a class="collapse-item" href="cards.html">Cards</a>
                </div>
            </div> */}
        </li>

       
        <li class="nav-item">
            <a class="nav-link " href="/projectManagement" data-target="#collapseUtilities"
                aria-expanded="true" aria-controls="collapseUtilities">
                <i class="fas fa-fw fa-wrench"></i>
                <span>Proje Yönetimi</span>
            </a>
            {/* <div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities"
                data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <h6 class="collapse-header">Custom Utilities:</h6>
                    <a class="collapse-item" href="utilities-color.html">Colors</a>
                    <a class="collapse-item" href="utilities-border.html">Borders</a>
                    <a class="collapse-item" href="utilities-animation.html">Animations</a>
                    <a class="collapse-item" href="utilities-other.html">Other</a>
                </div>
            </div> */}
        </li>

 


    <li class="nav-item">
    <a class="nav-link " href="/businessRegistration"data-target="#collapsePages"
        aria-expanded="true" aria-controls="collapsePages">
        <i class="fas fa-fw fa-folder"></i>
        <span>İş Kaydı</span>
    </a>
    {/* <div id="collapsePages" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
        <div class="bg-white py-2 collapse-inner rounded">
            <h6 class="collapse-header">Login Screens:</h6>
            <a class="collapse-item" href="/login">Login</a>
            <a class="collapse-item" href="register.html">Register</a>
            <a class="collapse-item" href="forgot-password.html">Forgot Password</a>
            <div class="collapse-divider"></div>
            <h6 class="collapse-header">Other Pages:</h6>
            <a class="collapse-item" href="404.html">404 Page</a>
            <a class="collapse-item" href="blank.html">Blank Page</a>
        </div>
    </div> */}
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

  <TableContainer style={{ width:"94%",margin:'3%',}}component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow >
            <TableCell align="left"style={{fontWeight: 'bold'}}>Proje </TableCell>
            <TableCell align="center" style={{fontWeight: 'bold'}}>Müşteri Bilgileri</TableCell>
            <TableCell align="center" style={{fontWeight: 'bold'}}>Yönet</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
             
            >
              <TableCell align="left"scope="row">
                {row.ProjectName}
              </TableCell>
              <TableCell align="center" >{row.CustomerName}</TableCell>
              <TableCell align="center" >   
                <Button
                    align="right"
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => onDeleteProject(row.projectId)}
                >
                  Delete
                </Button> 
                <Button
                  align="right"
                  variant="outlined"
                  color="primary"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleRowClick(row.projectId)}
                >
                  İncele
                </Button>
              </TableCell>

               
            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  

    </div>
    </div>
    </div>
    </div>

  
    </> )
}

export default Projects;