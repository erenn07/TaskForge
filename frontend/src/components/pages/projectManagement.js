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
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

function Projects() {
  const [rows, setRows] = useState([]);

  const navigate = useNavigate();

  function createData(ProjectName, CustomerName,projectDescription, projectId) {

    return { ProjectName, CustomerName,projectDescription, projectId };
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
          return { projectName: item.projectName, customerInfo,projectDescription:item.projectDescription, projectId: item._id };
        })
      );
      const newRows = userInfos.map(({ projectName,customerInfo,projectDescription, projectId }) => {
        console.log("Burada açıklamayı bakcam");
        console.log(projectDescription)
        if (customerInfo && customerInfo.firstName && customerInfo.lastName) {
          return createData(projectName, `${customerInfo.firstName} ${customerInfo.lastName}`,projectDescription, projectId);
        } else {
          // customerInfo veya özellikleri null veya tanımsızsa başa çıkmak için bir şey yapın
          if (!customerInfo) {
            return createData(projectName, 'Bilinmeyen Müşteri (Bilgi Yok)', projectId);
          } else {
            return createData(projectName, 'Bilinmeyen Müşteri (Ad veya Soyad Yok)', projectId);
          }
        }
      });
      
      

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

  <TableContainer style={{ width:"94%",margin:'3%',}}component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow >
            <TableCell align="left"style={{fontWeight: 'bold'}}>Proje </TableCell>
            <TableCell align="center" style={{fontWeight: 'bold'}}>Proje Künyesi</TableCell>
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
              <TableCell align="center" >{row.projectDescription}</TableCell>
              <TableCell align="center" >{row.CustomerName}</TableCell>

           
              <TableCell align="center" >   
                <Button
                    align="right"
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => onDeleteProject(row.projectId)}
                >
                  SİL
                </Button> 
                <Button
                  align="right"
                  variant="outlined"
                  color="primary"
                  startIcon={<SearchOutlinedIcon />}
                  onClick={() => handleRowClick(row.projectId)}
                >
                 Panoya Git
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