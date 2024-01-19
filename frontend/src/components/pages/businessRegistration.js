import logo from "../../../src/logo.svg";
import "../../App.css";
import Header from "./componentss/header";
import Sidebar from "./componentss/sidebar";

function BusinessRegistration() {
  return (
    <>
      <div id="page-top">
        <div id="wrapper">
          <Sidebar />

          <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
              <Header />

              <table>
                <tbody>
                  <tr>
                    <td>deneme</td>
                    <td>deneme2</td>
                    <td>deneme3 </td>
                  </tr>
                </tbody>
              </table>
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
