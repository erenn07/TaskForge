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



// const initialRows = [
//   {
//     id: randomId(),
//     name: randomTraderName(),
//     age: 25,
//     joinDate: randomCreatedDate(),
//     role: randomRole(),
//   },
//   {
//     id: randomId(),
//     name: randomTraderName(),
//     age: 36,
//     joinDate: randomCreatedDate(),
//     role: randomRole(),
//   },
//   {
//     id: randomId(),
//     name: randomTraderName(),
//     age: 19,
//     role: randomRole(),
//   },
//   {
//     id: randomId(),
//     name: randomTraderName(),
//     age: 28,
//     joinDate: randomCreatedDate(),
//     role: randomRole(),
//   },
//   {
//     id: randomId(),
//     name: randomTraderName(),
//     age: 23,
//     joinDate: randomCreatedDate(),
//     role: randomRole(),
//   },
// ];
// function EditToolbar(props) {
//     const { setRows, setRowModesModel } = props;
  
//     const handleClick = () => {
//       const id = randomId();
//       setRows((oldRows) => [...oldRows, { id, email: '', number: '', isNew: true }]);
//       setRowModesModel((oldModel) => ({
//         ...oldModel,
//         [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
//       }));
//     };
//     return (
//         <GridToolbarContainer>
//           <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
//             Müşteri Ekle
//           </Button>
//         </GridToolbarContainer>
//       );
    
// }

function Customers() {

    const [rows, setRows] = React.useState([]);
    const [rowModesModel, setRowModesModel] = React.useState({});
    const [name, setName] = React.useState('');
    const [surname, setsurName] = React.useState('');

const [email, setEmail] = React.useState('');
const [phone, setPhone] = React.useState('');
const [projectName, setProjectName] = React.useState('');
const [gridData, setGridData] = React.useState([]);

const userToken=localStorage.getItem('userToken')

const user=jwtDecode(userToken)
const userId=user.userId
React.useEffect(() => {
  async function fetchCustomers() {
    try {
      const response = await api.customer.getCustomers(userId);
      const modifiedRows = response.data.customer.map((customer) => ({
        ...customer,
        id: customer._id, 
      }));
      setRows(modifiedRows);
      console.log('musteriler : ', response.data);
    } catch (error) {
      console.error('Veriler alınırken hata oluştu:', error);
    }
  }

  fetchCustomers(); 
}, []); 



  //   {
  //     field: 'actions',
  //     type: 'actions',
  //     headerName: 'Actions',
  //     width: 100,
  //     cellClassName: 'actions',
  //   }


  const handleRowEditCommit = async (params) => {
    console.log('Params:', params); 

    const { id, field, updatedValue } = params;
  
    console.log('ID:', id);
    console.log('Field:', field);
    console.log('Updated Value:', updatedValue);
  
    try {
      await api.customer.updateCustomer(id, field, updatedValue);
  
      const updatedRows = rows.map((row) => {
        if (row.id === id) {
          return { ...row, [field]: updatedValue };
        }
        return row;
      });
  
      setGridData(updatedRows);
    } catch (error) {
      console.error('Müşteri güncellenirken hata oluştu:', error);
    }
  };
  
  
  

const handleFormSubmit = async (e) => {
  e.preventDefault();

    const response = await api.customer.addCustomer(name,surname,email,phone,projectName,userId);

    

    setName('');
    setsurName('')
    setEmail('');
    setPhone('');
    setProjectName('');
    window.location.reload()
  
};

const handleDelete = async (id) => {
const response =await api.customer.deleteCustomer(id)  
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
    


    const handleEditClick = (id) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };
  
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

      { field: 'firstName', headerName: 'Adı', width: 100, editable: true },
      { field: 'lastName', headerName: 'Soyadı', width: 100, editable: true },

      {
        field: 'email',
        headerName: 'E-Posta',
        type: 'String',
        width: 160,
        align: 'left',
        headerAlign: 'left',
        editable: true,
      },
      {
        field: 'phone',
        headerName: 'Numara',
        type: 'String',
        width: 120,
        editable: true,
      },
      {
        field: 'projectName',
        headerName: 'Proje Adı',
        width: 220,
        editable: true,
      
    },

    {
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
          Delete
        </Button>
      ),
    },
    //   {
    //     field: 'actions',
    //     type: 'actions',
    //     headerName: 'Actions',
    //     width: 100,
    //     cellClassName: 'actions',
    //   }
    ]
      
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
                {/* <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                        <h6 class="collapse-header">Custom Components:</h6>
                        <a class="collapse-item" href="buttons.html">Buttons</a>
                        <a class="collapse-item" href="cards.html">Cards</a>
                    </div>
                </div> */}
            </li>

           
            <li class="nav-item">
                <a class="nav-link " href="projectManagement" data-target="#collapseUtilities"
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

            {/* <hr class="sidebar-divider"/> */}


{/* <div class="sidebar-heading">
    Addons
</div> */}


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


{/* <li class="nav-item">
    <a class="nav-link" href="tables.html">
        <i class="fas fa-fw fa-table"></i>
        <span>Tables</span></a>
</li> */}


{/* <hr class="sidebar-divider d-none d-md-block"/> */}

{/* <button class="rounded-circle border-0" id="sidebarToggle" style={{ backgroundColor: 'your-color' }} aria-label="Toggle Sidebar"></button> */}





{/* <div class="sidebar-card d-none d-lg-flex">
    <img class="sidebar-card-illustration mb-2" src="img/undraw_rocket.svg" alt="..."/>
    <p class="text-center mb-2"><strong>SB Admin Pro</strong> is packed with premium features, components, and more!</p>
    <a class="btn btn-success btn-sm" href="https://startbootstrap.com/theme/sb-admin-pro">Upgrade to Pro!</a>
</div> */}
   



</ul>
<div id="content-wrapper" class="d-flex flex-column">


<div id="content">

   
    <Header/>


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

          

            <div style={{ height: 500, width: '100%' }}>
            <DataGrid
  rows={rows}
  columns={columns}
  pageSize={10}
  rowsPerPageOptions={[10, 20, 50]}
  checkboxSelection
  onCellEditStop={(params, event) => {
    if (params.field !== undefined) {

     handleRowEditCommit(params);
    }
  }}/>

    </div>




    {/* <Box
      sx={{
        height: 500,
        width: '100%',
        marginRight: 200,
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      {/* <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      /> */}
     
            {/* <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                    class="fas fa-download fa-sm text-white-50"></i> Generate Report</a> */}
        </div>


    </div>
  

</div>



<footer class="sticky-footer bg-white">
    <div class="container my-auto">
        <div class="copyright text-center my-auto">
            <span>Copyright &copy; TaskForge 2024</span>
        </div>
    </div>
</footer>


</div>

    </div>



    </div>
   
    </>
   
  );
}

export default Customers;