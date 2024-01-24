  import React, { useState, useEffect } from 'react';
  import { useNavigate } from 'react-router-dom';
  import Table from '@mui/material/Table';
  import TableBody from '@mui/material/TableBody';
  import TableCell from '@mui/material/TableCell';
  import TableContainer from '@mui/material/TableContainer';
  import TableHead from '@mui/material/TableHead';
  import TableRow from '@mui/material/TableRow';
  import Paper from '@mui/material/Paper';
  import Button from '@mui/material/Button';
  import DeleteIcon from '@mui/icons-material/DeleteOutlined';
  import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
  import Modal from '@mui/material/Modal';
  import Typography from '@mui/material/Typography';
  import TextField from '@mui/material/TextField';
  import MenuItem from '@mui/material/MenuItem';
  import Select from '@mui/material/Select';
  import InputLabel from '@mui/material/InputLabel';
  import FormControl from '@mui/material/FormControl';
  import { jwtDecode } from 'jwt-decode';

  import Sidebar from './componentss/sidebar';
  import Header from './componentss/header';
  import api from '../../services/api.js';
import axios from 'axios';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
  function BusinessRegistration() {
    const [rows, setRows] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [projectName, setProjectName] = useState([]);
    const [selectedProject, setSelectedProject] = useState("");
    const [selectedName, setSelectedName] = useState("");
    const [selectedDateTime, setSelectedDateTime] = useState(new Date()); 
    const [startDateTime, setStartDateTime] = useState(null);
    const [endDateTime, setEndDateTime] = useState(null);
    const[taskName,setTaskName]=useState([])
    const[selectedTaskName,setselectedTaskName]=useState([])

    
    const [customerName, setCustomerName] = useState('');
    const openModal = () => setModalOpen(true);
    const closeModal = () => {
      getProject();
      setModalOpen(false);
    };

    const getName = async () => {
try {
  const userToken = localStorage.getItem('userToken');
  const user = jwtDecode(userToken);
  const creatorID = user.userId;
  const response = await axios.get("http://localhost:3001/project/getProjectss",{
    params: {creatorID,selectedProject},  
    withCredentials: true
  });

  console.log(response.data,"resdaata")
  return response.data
  
} catch (error) {
  
}

    }


    const gettaskName = async () => {
      try {
        const userToken = localStorage.getItem('userToken');
        const user = jwtDecode(userToken);
        const creatorID = user.userId;
        const response = await axios.get("http://localhost:3001/task/getTask2",{
          params: {creatorID,selectedProject},
          withCredentials: true
      });

console.log(response.data," taskanameeeee")
const taskNames = response.data.map(task => task.taskName);

        return taskNames
        
      } catch (error) {
        
      }
      
      
      
          }

    useEffect(() => {
      const fetchData = async () => {
        try {
          const name = await gettaskName();
          setTaskName(name);
        } catch (error) {
          console.error(error);
        }
      };
    
      fetchData();
    }, [selectedProject]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const name = await getName();
          setSelectedName(name);
        } catch (error) {
          console.error(error);
        }
      };
    
      fetchData();
    }, [selectedProject]);

    const handleDateTimeChange = (e) => {
      const selectedDate = new Date(e.target.value);
      setSelectedDateTime(selectedDate);
      // Seçilen tarih ve saat değeri ile yapmak istediğiniz işlemleri burada gerçekleştirebilirsiniz
    };

    const handleStartDateTimeChange = (e) => {
      const startDate = new Date(e.target.value);
      setStartDateTime(startDate);
    };
  
    const handleEndDateTimeChange = (e) => {
      const endDate = new Date(e.target.value);
      setEndDateTime(endDate);
    };
    useEffect(() => {
      getProject();
      getBusinessRegistration()
    }, []);

    const getProject = async () => {
      try {
        const userToken = localStorage.getItem('userToken');
        const user = jwtDecode(userToken);
        const creatorID = user.userId;
        const response = await api.project.getProjects(creatorID);
    
        const projectNames = response.map(project => project.projectName);

        setProjectName(projectNames);
        setCustomerName()
      } catch (error) {
        console.log(error);
      }
    };



    const getBusinessRegistration = async () => { 
try {
  const userToken = localStorage.getItem('userToken');
  const user = jwtDecode(userToken);
  const creatorID = user.userId;

  const response =await axios.get("http://localhost:3001/business/getbusiness",{
    params: {creatorID},
    withCredentials: true
});

console.log(response,"ressoo")

setRows(response.data)


  
} catch (error) {
  console.log(error)
}



    }



    const addBusinessRegistration = async () => {
      try {    
        const userToken = localStorage.getItem('userToken');
        const user = jwtDecode(userToken);
        const creatorID = user.userId;

        const newRow = {
          ProjectName: selectedProject,
          projectTask:selectedTaskName,
          projectDescription: `${selectedDateTime.toLocaleDateString()} ${selectedDateTime.toLocaleTimeString()}`,
          CustomerName: selectedName,
          creatorID:creatorID
        };
        const response = await axios.post("http://localhost:3001/business/addbusiness",{
          newRow,
           withCredentials: true
       });
        setRows((prevRows) => [...prevRows, newRow]);
    
        window.location.reload()
        closeModal();
        

      console.log(response)

      }
      
      catch (error) {
        console.error('Error adding business registration:', error);
      }
    };
    

    const navigate = useNavigate();

    const onDeleteProject = async (projectId) => {
      await api.project.deleteProject(projectId);
      window.location.reload();
    };

    const handleRowClick = (projectId) => {
      navigate('/projectDetails', { state: { projectId } });
    };

    return (
      <>
        <div id="page-top">
          <div id="wrapper">
            <Sidebar />
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                <Header />

                <TableContainer style={{ width: '94%', margin: '3%' }} component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left" style={{ fontWeight: 'bold' }}>
                          Proje{' '}
                        </TableCell>
                        <TableCell align="center" style={{ fontWeight: 'bold' }}>
                          Çalışma Günü ve Saati
                        </TableCell>
                        <TableCell align="center" style={{ fontWeight: 'bold' }}>
                          Çalışılan Görev
                        </TableCell>
                        <TableCell align="center" style={{ fontWeight: 'bold' }}>
                          Müşteri Bilgileri
                        </TableCell>
                        <TableCell align="center" style={{ fontWeight: 'bold' }}>
                          Yönet
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell align="left" scope="row">
                            {row.projectName}
                          </TableCell>
                          <TableCell align="center">{row.projectDescription}</TableCell>
                          <TableCell align="center">{row.tasks}</TableCell>

                          <TableCell align="center">{row.customer}</TableCell> 
                          <TableCell align="center">
                            <Button
                              variant="outlined"
                              color="error"
                              startIcon={<DeleteIcon />}
                              onClick={() => onDeleteProject(row.projectId)}
                            >
                              SİL
                            </Button>
                            <Button
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

                <Button onClick={openModal}>İş kaydı ekle</Button>
                {/* Modal for adding business registration */}
                <Modal open={isModalOpen} onClose={closeModal}>
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: 400,
                      backgroundColor: 'white',
                      boxShadow: 24,
                      p: 4,
                    }}
                  >
                    <Typography variant="h6" component="div" gutterBottom>
                      İş Kaydı Ekle
                    </Typography>
                    <FormControl fullWidth margin="normal">
  <InputLabel id="project-name-label" style={{ color: 'black' }}>
    Proje Adı
  </InputLabel>
  <Select
    labelId="project-name-label"
    id="project-name"
    value={selectedProject}
  
    onChange={(e) => setSelectedProject(e.target.value)}
  >
    {Array.isArray(projectName) &&
      projectName.map((project) => (
        <MenuItem key={project} value={project} style={{ color: 'black' }}>
          {project}
        </MenuItem>
      ))}
  </Select>
</FormControl>

<FormControl fullWidth margin="normal">
  <InputLabel id="project-name-label" style={{ color: 'black' }}>
    Proje Taskları
  </InputLabel>
  <Select
    labelId="project-name-label"
    id="project-name"
    value={selectedTaskName}
  
    onChange={(e) => setselectedTaskName(e.target.value)}
  >
    {Array.isArray(taskName) &&
      taskName.map((task) => (
        <MenuItem key={task} value={task} style={{ color: 'black' }}>
          {task}
        </MenuItem>
      ))}
  </Select>
</FormControl>
Müşteri adı
                    <TextField
                      //label="Müşteri Adı"
                      disabled
                      fullWidth
                      margin="normal"
                      value={selectedName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />

<label>
        Başlangıç Tarih ve Saat:
        <input
          type="datetime-local"
          value={startDateTime ? startDateTime.toISOString().slice(0, 16) : ''}
          onChange={handleStartDateTimeChange}
        />
      </label>

      <label>
        Bitiş Tarih ve Saat:
        <input
          type="datetime-local"
          value={endDateTime ? endDateTime.toISOString().slice(0, 16) : ''}
          onChange={handleEndDateTimeChange}
        />
      </label>

                    <Button variant="outlined" color="primary" onClick={addBusinessRegistration}>
                      Kaydet
                    </Button>
                  </div>
                </Modal>

              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  export default BusinessRegistration;
