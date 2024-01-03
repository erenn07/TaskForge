import logo from '../../../src/logo.svg';
import '../../App.css';
import Header from './componentss/header.js';
import * as React from 'react';
//import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
//import AddIcon from '@mui/icons-material/Add';
//import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
//import SaveIcon from '@mui/icons-material/Save';
//import CancelIcon from '@mui/icons-material/Close';
import api from '../../services/api';
import Dialog from '@mui/material/Dialog';

import {
  GridRowModes,
  DataGrid,
  //GridToolbarContainer,
  //GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';

import {
  //randomCreatedDate,
  //randomTraderName,
  //randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
  return randomArrayItem(roles);
};

function Customers() {

  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [name, setName] = React.useState('');
  const [surname, setsurName] = React.useState('');

  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [projectName, setProjectName] = React.useState('');
  const [gridData, setGridData] = React.useState([]);
  const [newInputValue, setNewInputValue] = React.useState('');
  const [updatedValue, setUpdatedValue] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const [editedData, setEditedData] = React.useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    projectName: '',
  });
  const userToken = localStorage.getItem('userToken')

const user=jwtDecode(userToken)
const creatorID=user.userId
React.useEffect(() => {
  async function fetchCustomers() {
    try {
      const response = await api.customer.getCustomers(creatorID);
      const modifiedRows = response.data.customer.map((customer) => ({
        ...customer,
        id: customer._id, 
      }));
      setRows(modifiedRows);
    } catch (error) {
      console.error('Veriler alınırken hata oluştu:', error);
    }
  }

    fetchCustomers();
  }, []);



  const handleInputChange = (event) => {
    setNewInputValue(event.target.value);
  };

  const handleRowEditCommit = async (params) => {
    console.log('Params:', params);

    const { id, field, value } = params;

    console.log('ID:', id);
    console.log('Field:', field);
    console.log('Updated Value:', value);

    try {
      await api.customer.updateCustomer(id, field, value);

      const updatedRows = rows.map((row) => {
        if (row.id === id) {
          return { ...row, [field]: value };
        }
        return row;
      });
  
      setRows(updatedRows);
      setGridData(updatedRows);
    } catch (error) {
      console.error('Müşteri güncellenirken hata oluştu:', error);
    }
  };




const handleFormSubmit = async (e) => {
  e.preventDefault();
 
    const response = await api.customer.addCustomer(name,surname,email,phone,projectName,creatorID);
    const { userId: customerId, email: customerEmail, projectName: customerProjectName } = response;
    const projectPayload = {
      customerId: customerId,
      customerEmail: customerEmail,
      customerProjectName: customerProjectName,
    };
//    const projectRes=await api.project.addProject(projectPayload)


    /*     const modifiedRows = [...rows, { id: customerId, firstName: name, lastName: surname, email, phone, projectName }];
 */    setName('');
    setsurName('');
    setEmail('');
    setPhone('');
    setProjectName('');
    window.location.reload()

  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const updatedData = {
        id: editedData.id,
        firstName: editedData.firstName,
        lastName: editedData.lastName,
        email: editedData.email,
        phone: editedData.phone,
        projectName: editedData.projectName,
      };

      const response = await api.customer.updateCustomer(updatedData);
      window.location.reload()
      console.log('Güncelleme başarılı:', response);


    } catch (error) {
      console.error('Güncelleme işlemi sırasında hata oluştu:', error);
    }
  };



  const handleDelete = async (id) => {
    const response = await api.customer.deleteCustomer(id)
    window.location.reload()


  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };


  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };



  const handleProjectNameChange = (event) => {
    setProjectName(event.target.value);
  };



  // const handleEditClick = (id) => () => {
  //   setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  // };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };




  const columns = [
    //{ field: '_id', headerName: 'ID', width: 100 },

    { field: 'firstName', headerName: 'Adı', width: 100, editable: false },
    { field: 'lastName', headerName: 'Soyadı', width: 100, editable: false },

    {
      field: 'email',
      headerName: 'E-Posta',
      type: 'String',
      width: 160,
      align: 'left',
      headerAlign: 'left',
      editable: false,
    },
    {
      field: 'phone',
      headerName: 'Numara',
      type: 'String',
      width: 120,
      editable: false,
    },
    {
      field: 'projectName',
      headerName: 'Proje Adı',
      width: 220,
      editable: false,

    },


    {
      field: 'edit',
      headerName: 'Düzenle',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleEditClick(params.row)}
        >
          Düzenle
        </Button>
      ),
    }, {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => handleDelete(params.id)}
        >
         SİL
        </Button>
      ),
    },
  ];

  const handleEditClick = (row) => {
    setOpen(true);


    setEditedData({
      id: row.id,
      firstName: row.firstName,
      lastName: row.lastName,
      email: row.email,
      phone: row.phone,
      projectName: row.projectName,
    });
  };

  //   {
  //     field: 'actions',
  //     type: 'actions',
  //     headerName: 'Actions',
  //     width: 100,
  //     cellClassName: 'actions',
  //   }

  const handleClose = () => {
    setOpen(false);
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

            <hr class="sidebar-divider my-0" />


            <li class="nav-item active">
              <a class="nav-link" href="index.html">
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard</span></a>
            </li>


            <hr class="sidebar-divider" />


            <div class="sidebar-heading">

            </div>

            <li class="nav-item">
              <a class="nav-link " href="/customers" data-target="#collapseTwo"
                aria-expanded="true" aria-controls="collapseTwo">
                <i class="fas fa-fw fa-cog"></i>
                <span>Müşteriler</span>
              </a>

            </li>


            <li class="nav-item">
              <a class="nav-link " href="projectManagement" data-target="#collapseUtilities"
                aria-expanded="true" aria-controls="collapseUtilities">
                <i class="fas fa-fw fa-wrench"></i>
                <span>Proje Yönetimi</span>
              </a>

            </li>

            {/* <hr class="sidebar-divider"/> */}


            {/* <div class="sidebar-heading">
    Addons
</div> */}


            <li class="nav-item">
              <a class="nav-link " href="/businessRegistration" data-target="#collapsePages"
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


              <Header />


              <div class="container-fluid">
                <form onSubmit={handleFormSubmit}>
                  <label>
                    Adı:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                  </label>
                  <label>
                    Soyadı:
                    <input type="text" value={surname} onChange={(e) => setsurName(e.target.value)} />
                  </label>
                  <label>
                    E-Posta:
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </label>
                  <label>
                    Numara:
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </label>
                  <label>
                    Proje Adı:
                    <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
                  </label>
                  <button type="submit">Müşteri Ekle</button>
                </form>

                <div class="flex align-items-center  mb-4">
                  {/* <h1 class="h3 mb-0 text-gray-800"></h1> */}


                  <Dialog open={open} onClose={handleClose} maxWidth="xl" PaperProps={{
                    sx: {
                      minHeight: "25%",
                      maxHeight: "25%",maxWidth:"90%"

                    }
                  }} >
                    <form 
                    style={{justifyContent:"center",margin:"80px"}}
                    sx={{
                      display: "flex",
                      flexDirection: "column"
                    }} onSubmit={handleUpdate}>
                      <label>
                        Adı:
                        <input
                        style={{ marginLeft: "15px" }}
                          type="text"
                          value={editedData.firstName}
                          onChange={(e) =>
                            setEditedData({ ...editedData, firstName: e.target.value })
                          }
                        />
                      </label>

                      <label style={{ marginLeft: "15px" }}>
                        Soyadı:
                        <input
                        style={{ marginLeft: "15px" }}
                          type="text"
                          value={editedData.lastName}
                          onChange={(e) =>
                            setEditedData({ ...editedData, lastName: e.target.value })
                          }
                        />
                      </label>
                      <label style={{ marginLeft: "15px" }}>
                        E-Posta:
                        <input
                        style={{ marginLeft: "15px" }}
                          type="text"
                          value={editedData.email}
                          onChange={(e) =>
                            setEditedData({ ...editedData, email: e.target.value })
                          }
                        />
                      </label>
                      <label style={{ marginLeft: "15px" }}>
                        Numara:
                        <input
                        style={{ marginLeft: "15px" }}
                          type="text"
                          value={editedData.phone}
                          onChange={(e) =>
                            setEditedData({ ...editedData, phone: e.target.value })
                          }
                        />
                      </label >
                      <label style={{ marginLeft: "15px" }}>
                        Proje Adı:
                        <input
                        style={{ marginLeft: "15px" }}
                          type="text"
                          value={editedData.projectName}
                          onChange={(e) =>
                            setEditedData({ ...editedData, projectName: e.target.value })
                          }
                        />
                      </label>
                      <Button style={{ marginLeft: "15px" }} type="submit">Değişiklikleri Kaydet</Button>
                    </form>
                  </Dialog>

                  <div style={{ height: 500, width: '100%' }}>







                    <DataGrid
                      rows={rows}
                      columns={columns}
                      pageSize={10}
                      rowsPerPageOptions={[10, 20, 50]}
                      checkboxSelection
                    />





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

        </div >



      </div >

    </>

  );
}

export default Customers;