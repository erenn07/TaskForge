import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { jwtDecode } from "jwt-decode";
import Dialog from "@mui/material/Dialog";

import Sidebar from "./componentss/sidebar";
import Header from "./componentss/header";
import api from "../../services/api.js";
import axios from "axios";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
function BusinessRegistration() {
  const [rows, setRows] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [projectName, setProjectName] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [taskName, setTaskName] = useState([]);
  const [selectedTaskName, setselectedTaskName] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [projectDescription, setprojectDescription] = useState(); 
  const [selectedHour, setSelectedHour] = useState('');
  const [open1, setOpen1] = React.useState(false);
  const [id, setid] = useState('');
  const[selectedCustomerName,setSelectedCustomerName]=useState([])
  const[customerName,setCustomerName]=useState([])

  //
  const [selectedDate, setselectedDate] = useState(new Date()); 
  
  const [editedData, setEditedData] = React.useState({
    projectName: "",
    job: "",
    workday: "",
    hour: "",
    customerName: "",

    });


  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    getProject();
    setModalOpen(false);
  };

 

  const userToken = localStorage.getItem("userToken");

  const user = jwtDecode(userToken);
  const creatorID = user.userId;
  // React.useEffect(() => {
  //   async function fetchCustomers() {
  //     try {
  //       const response = await api.customer.getCustomers(creatorID);
  //       const modifiedRows = response.data.customer.map((customer) => ({
  //         ...customer,
  //         id: customer._id,
  //       }));
  //       setRows(modifiedRows);
  //     } catch (error) {
  //       console.error("Veriler alınırken hata oluştu:", error);
  //     }
  //   }

  //   fetchCustomers();
  // }, []);

useEffect(()=>{
getProject()




},[selectedCustomerName])


  useEffect(() => {
    getCustomer()
    //getBusinessRegistration()
  }, []);

  const handleHourChange = (event) => {
    setSelectedHour(event.target.value);
  };

  const handleDateTimeChange = (e) => {
    const selectedDate = new Date(e.target.value);
    setSelectedDateTime(selectedDate);
    // Seçilen tarih ve saat değeri ile yapmak istediğiniz işlemleri burada gerçekleştirebilirsiniz
  };

  const [minuteInput, setMinuteInput] = useState('');


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
    getBusinessRegistration();
  }, []);

  const getProject = async () => {
    try {
      const response = await axios.get("http://localhost:3001/project/getcustomerproject",{
        params:{selectedCustomerName,creatorID}
        ,
          withCredentials: true,
      });
      console.log(response," pronamesss")

      const projectNames = response.data.projects.map((project) => project);
      setProjectName(projectNames);
    } catch (error) {
      console.log(error);
    }
  };

  const getBusinessRegistration = async () => {
    try {
      const userToken = localStorage.getItem("userToken");
      const user = jwtDecode(userToken);
      const creatorID = user.userId;

      const response = await axios.get(
        "http://localhost:3001/business/getbusiness",
        {
          params: { creatorID },
          withCredentials: true,
        }
      );

      console.log(response, "ressoo");

      setRows(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addBusinessRegistration = async () => {
    try {
      const userToken = localStorage.getItem("userToken");
      const user = jwtDecode(userToken);
      const creatorID = user.userId;

      const newRow = {
        ProjectName: selectedProject,
        CustomerName: selectedCustomerName,
        projectDescription:projectDescription ,
        Date:selectedDate,
        minute:minuteInput,
        creatorID: creatorID,
      };
      const response = await axios.post(
        "http://localhost:3001/business/addbusiness",
        {
          newRow,
          withCredentials: true,
        }
      );
      setRows((prevRows) => [...prevRows, newRow]);

      window.location.reload();
      closeModal();

      console.log(response);
    } catch (error) {
      console.error("Error adding business registration:", error);
    }
  };

  const navigate = useNavigate();

  const onDeleteBusiness = async (businessId) => {
    const response = await axios.get(
      "http://localhost:3001/business/deletebusiness",
      { params: { businessId } },
      { withCredentials: true }
    );

    window.location.reload();
  };

  const onDeleteProject = async (projectId) => {
    await api.project.deleteProject(projectId);
    window.location.reload();
  };

  const getCustomer = async () => {
    try {
      const userToken = localStorage.getItem('userToken');
      const user = jwtDecode(userToken);
      const creatorID = user.userId;
      const response = await api.customer.getCustomers(creatorID);
  console.log(response.data.customer,"custooo")


      const customerNames = response.data.customer.map(customer => customer.firstName+" "+customer.lastName);
      console.log(customerNames," custoNamess")

      setCustomerName(customerNames);
    } catch (error) {
      console.log(error);
    }
  };


  const handleUpdate = async (e) => {  
    e.preventDefault();
    try {
      const updatedData = {
        projectName: editedData.projectName,
        job: editedData.job,
        workday: editedData.workday,
        hour: editedData.hour,
        customerName: editedData.customerName
      };
      const response = await axios.post(
        `http://localhost:3001/business/updatebusiness/${id}`,
         {updatedData },
        { withCredentials: true }
      );      
      window.location.reload();
      console.log("Güncelleme başarılı:", response);
    } catch (error) {
      console.error("Güncelleme işlemi sırasında hata oluştu:", error);
    }
  }
  
  
  const handleRowClick = async (rowId) => {
    console.log(rowId, "rowowo");
    setOpen(true);
    setid(rowId)
  }
  
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div id="page-top">
        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Header />

              <TableContainer
                style={{ width: "94%", margin: "3%" }}
                component={Paper}
              >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left" style={{ fontWeight: "bold" }}>
                        Proje{" "}
                      </TableCell>
                      <TableCell align="center" style={{ fontWeight: "bold" }}>
                      Yapılan İş</TableCell>
                      <TableCell align="center" style={{ fontWeight: "bold" }}>
                        Çalışma Günü 
                      </TableCell>
                      <TableCell align="center" style={{ fontWeight: "bold" }}>
                      Çalışılan Dakika
                      </TableCell>
                     
                      <TableCell align="center" style={{ fontWeight: "bold" }}>
                        Müşteri Bilgileri
                      </TableCell>
                      <TableCell align="center" style={{ fontWeight: "bold" }}>
                        Yönet
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="left" scope="row">
                          {row.projectName}
                        </TableCell>
                        <TableCell align="center">
                          {row.projectDescription}
                        </TableCell>
                        <TableCell align="center">
                          {row.date}
                        </TableCell>
                        <TableCell align="center">
                          {row.hour}
                        </TableCell>
                        <TableCell align="center">{row.customer}</TableCell>
                        <TableCell align="center">
                          <Button
                            variant="outlined"
                            color="error"
                            startIcon={<DeleteIcon />}
                            onClick={() => onDeleteBusiness(row._id)}
                          >
                            SİL
                          </Button>
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => handleRowClick(row._id)}
                          >
                            Düzenle{" "}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Button onClick={openModal}
              style={{
                backgroundColor:"#003466",
                color:"#f2f2f2",
                position:"relative",
                left:"480px",
                width:"200px",
                height:50
              }} 
              >İş kaydı ekle</Button>
              {/* Modal for adding business registration */}
              <Modal open={isModalOpen} onClose={closeModal}>
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 700,
                    height: 600,
                    padding: 25,
                    backgroundColor: "white",
                    boxShadow: 24,
                    p: 4,
                  }}
                >
                  <Typography  variant="h6" component="div" gutterBottom 
                  style={{textAlign:"center",
                  color:"black"
                  }}>
                   İŞ KAYDI EKLE
                  </Typography>

<div>Müşteri</div>
<Select
                    label="Müşteri Adı"
                    
                    fullWidth
                    margin="normal"
                    value={selectedCustomerName}
                    onChange={(e) => setSelectedCustomerName(e.target.value)}
                  >
{Array.isArray(customerName) &&
    customerName.map((customer) => (
      <MenuItem key={customer} value={customer} style={{ color: 'black' }}>
        {customer}
      </MenuItem>
    ))}

   </Select>
                  <FormControl fullWidth margin="normal">
                    <label style={{ color: "black" }}>Proje Adı</label>
                    <Select
                      labelId="project-name-label"
                      id="project-name"
                      value={selectedProject}
                      onChange={(e) => setSelectedProject(e.target.value)}
                    >
                      {Array.isArray(projectName) &&
                        projectName.map((project) => (
                          <MenuItem
                            key={project}
                            value={project}
                            style={{ color: "black" }}
                          >
                            {project}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                  {/* <TextField
  placeholder="Müşteri Adı"
  disabled
  fullWidth
  margin="normal"
  value={selectedName} 
/> */}


                  <FormControl fullWidth margin="normal">
                    <label style={{ color: "black" }}> İş Açıklaması</label>

                    <TextField
                      labelId="project-name-label"
                      id="project-name"
                      value={projectDescription}
                      onChange={(e) => setprojectDescription(e.target.value)}
                    />
                      {/* {Array.isArray(taskName) &&
                        taskName.map((task) => (
                          <MenuItem
                            key={task}
                            value={task}
                            style={{ color: "black" }}
                          >
                            {task}
                          </MenuItem>
                        ))} */}
                  </FormControl>

                 
                  <label style={{ color: "black", display:"block"}}> 
  Çalışılan Gün Tarih:
  <input 
    style={{ marginLeft: "10px", marginTop: "15px", width:"300px"}}
    type="date"
    value={selectedDate}
    onChange={(e) => setselectedDate(e.target.value)}
    />
</label>
<br></br>
<FormControl fullWidth>
<TextField
  label="Harcanan Dakikayı Girin"
  type="number"
  inputProps={{ min: 0 }}
  onChange={(e) => setMinuteInput(e.target.value)}
/>
    </FormControl>

             

                  <Button
                  style={{
                    position:"relative",
                    right:"150px",
                    top:"30px",
                   left:"210px",
                    width:"200px",
                    height:"50px"

                   }}
                    variant="outlined"
                    color="primary"
                    onClick={addBusinessRegistration}
                  >
                    Kaydet
                  </Button>
                </div>
              </Modal>

              <Dialog
                  open={open}
                  onClose={handleClose}
                  maxWidth="xl"
                  PaperProps={{
                    style: {
                      height: "700px",

                      width: "500px",
                      padding: "25px",
                    },
                  }}
                >
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">İş Kaydı Düzenleme</h1>
                  </div>
                  <form className="user" onSubmit={handleUpdate}>
                  <div>Müşteri</div>

<Select
                    label="Müşteri Adı"
                  
                    fullWidth
                    margin="normal"
                    value={selectedCustomerName}
                    onChange={(e) => setSelectedCustomerName(e.target.value)}
                  >
{Array.isArray(customerName) &&
    customerName.map((customer) => (
      <MenuItem key={customer} value={customer} style={{ color: 'black' }}>
        {customer}
      </MenuItem>
    ))}

   </Select>

                    <div className="form-group">
                      <label>Proje Adı:</label>
                      <input
                        type="text"
                        value={editedData.projectName}
                        onChange={(e) =>
                          setEditedData({
                            ...editedData,
                            projectName: e.target.value,
                          })
                        }
                        className="form-control form-control-user"
                        id="exampleInputEmail"
                        aria-describedby="emailHelp"
                        placeholder="Müşteri Ad"
                      />
                    </div>
                    <div className="form-group">
                      <label>Yapılan İş:</label>
                      <input
                        type="text"
                        value={editedData.job}
                        onChange={(e) =>
                          setEditedData({
                            ...editedData,
                            job: e.target.value,
                          })
                        }
                        className="form-control form-control-user"
                        id="exampleInputPassword"
                        placeholder="Müşteri Soyad"
                      />
                    </div>
                    <div className="form-group">
                    <label style={{ color: "black", display:"block"}}> 
  Çalışılan Gün Tarih:
  <input 
    style={{ marginLeft: "10px", marginTop: "15px", width:"300px"}}
    type="date"
    value={editedData.workday}
    onChange={(e) =>
      setEditedData({
        ...editedData,
        workday: e.target.value,
      })
    }    />
</label>
    
                    </div>
                    <div className="form-group">
                      <label>Çalışma Saati : </label>
                      <input
                        type="text"
                        value={editedData.hour}
                        onChange={(e) =>
                          setEditedData({
                            ...editedData,
                            hour: e.target.value,
                          })
                        }
                        className="form-control form-control-user"
                        id="exampleInputPassword"
                        placeholder="Müşteri Telefon"
                      />
                    </div>
                    {/* <div className="form-group">
                      <label>Proje Adı:</label>
                      <input
                        type="text"
                        value={editedData.projectName}
                        onChange={(e) =>
                          setEditedData({
                            ...editedData,
                            projectName: e.target.value,
                          })
                        }
                        className="form-control form-control-user"
                        id="exampleInputPassword"
                        placeholder="Proje Adı"
                      />
                    </div> */}

                    <button
                      type="submit"
                      className="btn btn-primary btn-user btn-block"
                    >
                      Değişiklikleri Kaydet
                    </button>
                  </form>
                </Dialog>




            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BusinessRegistration;
