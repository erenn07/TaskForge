import React from 'react';

export default function Login() {
    return (
        <>
            <div className="bg-gradient-primary">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-10 col-lg-12 col-md-9">
                            <div className="card o-hidden border-0 shadow-lg my-5">
                                <div className="card-body p-0">
                                    <div className="row">
                                        <div className="col-lg-6 d-none d-lg-block bg-login-image">
                                            <img  src="./assets/img/taskForge.png"></img>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="p-5">
                                                <div className="text-center">
                                                    <h1 className="h4 text-gray-900 mb-4">Welcome </h1>
                                                </div>
                                                <form className="user">
                                                    <div className="form-group">
                                                        <input
                                                            type="email"
                                                            className="form-control form-control-user"
                                                            id="exampleInputEmail"
                                                            aria-describedby="emailHelp"
                                                            placeholder="Enter Email Address..."
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <input
                                                            type="password"
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
                                                    <a href="./Dashboard" className="btn btn-primary btn-user btn-block">
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
                </div>
            </div>
            <script src="%PUBLIC_URL%/assets/vendor/jquery/jquery.min.js"></script>
            <script src="%PUBLIC_URL%/assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
            <script src="%PUBLIC_URL%/assets/vendor/jquery-easing/jquery.easing.min.js"></script>
            <script src="%PUBLIC_URL%/assets/js/sb-admin-2.min.js"></script>
        </>
    );
}
