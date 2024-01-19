import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import "../../../App.css";
import { jwtDecode } from "jwt-decode";

function Sidebar() {
  return (
    <ul
      class="navbar-nav bg-gradient-primary1 sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      <a
        class="sidebar-brand d-flex align-items-center justify-content-center"
        href="Dashboard"
      >
        <div class="sidebar-brand-icon ">
          <img src="./assets/img/logo.png"></img>
          {/* <i class="fas fa-laugh-wink"></i> */}
        </div>
        <div class="sidebar-brand-text mx-3"></div>
      </a>

      <hr class="sidebar-divider my-0" />

      <li class="nav-item active">
        <a class="nav-link" href="index.html">
          <i class="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </a>
      </li>

      <hr class="sidebar-divider" />

      <div class="sidebar-heading"></div>

      <li class="nav-item">
        <a
          class="nav-link "
          href="/customers"
          data-target="#collapseTwo"
          aria-expanded="true"
          aria-controls="collapseTwo"
        >
          <i class="fas fa-fw fa-cog"></i>
          <span>Müşteriler</span>
        </a>
      </li>

      <li class="nav-item">
        <a
          class="nav-link "
          href="projectManagement"
          data-target="#collapseUtilities"
          aria-expanded="true"
          aria-controls="collapseUtilities"
        >
          <i class="fas fa-fw fa-wrench"></i>
          <span>Proje Yönetimi</span>
        </a>
      </li>

      <li class="nav-item">
        <a
          class="nav-link "
          href="/businessRegistration"
          data-target="#collapsePages"
          aria-expanded="true"
          aria-controls="collapsePages"
        >
          <i class="fas fa-fw fa-folder"></i>
          <span>İş Kaydı</span>
        </a>
      </li>

      <li class="nav-item">
        <a class="nav-link" href="/bills">
          <i class="fas fa-fw fa-chart-area"></i>
          <span>Faturalar</span>
        </a>
      </li>
    </ul>
  );
}

export default Sidebar;
