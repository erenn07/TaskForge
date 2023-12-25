import { useState,useEffect  } from "react";
import {useNavigate} from "react-router-dom";
import api from "../../services/api.js"
import React from 'react';
import axios from 'axios';


export default function Login() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
        const navigate = useNavigate();

        useEffect(() => {
       
          }, []);

          const LoginData = async(e)=>{
            e.preventDefault();
            try{
            const response= await api.user.login(email,password)
    
            console.log("bu apiden gelen login cevabı:",response)
    
            console.log(response)
            if(response.success){
                navigate('/dashboard');
                const userToken = response.token;
                const form = await api.user.getUser(userToken)
                console.log("bu form",form);
            }else{
                if (response.message){
                  alert(response.message);  
                }else{
                alert("Unexpected response from server")
            }}
        }catch (error) {
                if (error.response) {
                  if (error.response.status === 404) {
                    alert(error.response.data.message);
                  } else if (error.response.status===401) { 
                    alert(error.response.data.message);
                  }else{     
                    alert("Server error. Please try again later.");
                  }
                } else if (error.request) {
                  alert("No response from server. Please try again later.");
                } else {
                  alert("Request failed. Please check your internet connection and try again.");
                }
              }
            };



    return (
        <>
          
            <div className="bg-gradient-primary">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-10 col-lg-12 col-md-9">
                            <div className="card o-hidden border-0 shadow-lg my-5">
                                <div className="card-body p-0">
                                    <div className="row">
                                        <div className="col-lg-6 d-none d-lg-block bg-login-image  ">
                                  
                                        </div>
                                        <div className="col-lg-6 ">
                                            <div className="p-5">
                                                <div className="text-center">
                                                    <h1 className="h4 text-gray-900 mb-4">Welcome </h1>
                                                </div>
                                                <form className="user">
                                                    <div className="form-group">
                                                        <input
                                                            type="email"
                                                            onChange={(e) => setEmail(e.target.value) }
                                                            className="form-control form-control-user"
                                                            id="exampleInputEmail"
                                                            aria-describedby="emailHelp"
                                                            placeholder="Enter Email Address..."
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <input
                                                            type="password"
                                                            onChange={(e) => setPassword(e.target.value) }
                                                            className="form-control form-control-user"
                                                            id="exampleInputPassword"
                                                            placeholder="Password"
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="custom-control custom-checkbox small">
                                                            <input
                                                                type="checkbox"
                                                                className="custom-control-input"
                                                                id="customCheck"
                                                            />
                                                            <label className="custom-control-label" htmlFor="customCheck">
                                                                Remember Me
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <a onClick={LoginData} className="btn btn-primary btn-user btn-block">
                                                        Login
                                                    </a>
                                                    <hr />
                                                    <a href="index.html" className="btn btn-google btn-user btn-block">
                                                        <i className="fab fa-google fa-fw"></i> Login with Google
                                                    </a>
                                                    <a href="index.html" className="btn btn-facebook btn-user btn-block">
                                                        <i className="fab fa-facebook-f fa-fw"></i> Login with Facebook
                                                    </a>
                                                   
                                                </form>
                                                <hr />
                                                <div className="text-center">
                                                    <a className="small" href="forgot-password.html">
                                                        Forgot Password?
                                                    </a>
                                                </div>
                                                <div className="text-center">
                                                    <a className="small" href="./register">
                                                        Create an Account!
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer class="sticky-footer ">
    <div class="container my-auto">
        <div class="copyright text-center my-auto ">
           
        </div>
    </div>
    
</footer>


                </div>
            </div>
           
            <script src="%PUBLIC_URL%/assets/vendor/jquery/jquery.min.js"></script>
            <script src="%PUBLIC_URL%/assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
            <script src="%PUBLIC_URL%/assets/vendor/jquery-easing/jquery.easing.min.js"></script>
            <script src="%PUBLIC_URL%/assets/js/sb-admin-2.min.js"></script>
        </>
    );
}
