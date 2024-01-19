import logo from '../../../src/logo.svg';
import '../../App.css';
import Header from './componentss/header';

function BusinessRegistration() {
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
   

<></>
    <div class="container-fluid">

    
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">MERHABA BU BİR İŞ KAYDI SAYFASIDIR.</h1>
           
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

    </div>

    </div>
   
    </>
   
  );
}

export default BusinessRegistration;
