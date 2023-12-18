
import { useState, useEffect } from "react";
import api from "../../services/api.js"


export default function Register(){


    const [form, setForm] = useState({
        firstName: "",
        lastName:"",
        email:"",
        phone:"",
        password:"",
        passwordConfirmation:""

      });
    
    
    
    
    


const RegisterData= async ()=>{

console.log("bu form",form)
    const response = await api.user.register(form)
    console.log("bu apiden gelen cevap:",response)


    if(response.status ===201){
        console.log("hatasız")
    }else if (response.status===400){
        console.log("400 geldi")
    }else{
        console.log("hatayı bilmiyoruz")
    }
}


const onChange =async (prop,value)=>{
 setForm({
    ...form,
   [prop]:value,
})
}

    return(


<div class="bg-gradient-primary">

<div class="container">
<div className="row justify-content-center">
<div className="col-xl-10 col-lg-12 col-md-9">
    <div class="card o-hidden border-0 shadow-lg my-5">
        <div class="card-body p-0">
          
            <div class="row">
                <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
                <div class="col-lg-7">
                    <div class="p-5">
                        <div class="text-center">
                            <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
                        </div>
                        <form class="user">
                            <div class="form-group row">
                                <div class="col-sm-6 mb-3 mb-sm-0">
                                    <input 
                                    type="text"
                                  
                                    onChange={(e) => onChange("firstName", e.target.value)}

                                     class="form-control form-control-user" id="exampleFirstName"
                                        placeholder="First Name"/>
                                </div>
                                <div class="col-sm-6">
                                    <input 
                                    type="text"
                                    onChange={(e) => onChange("lastName", e.target.value)}
                                     class="form-control form-control-user" id="exampleLastName"
                                        placeholder="Last Name"/>
                                </div>

                               
                            </div>
                            <div class="form-group">
                                <input type="tel" class="form-control form-control-user" id="exampleInputPhoneNumber"
                                    placeholder="Phone Number"/>
                            </div>
                            <div class="form-group">
                                <input 
                                type="email"
                                onChange={(e) => onChange("email", e.target.value)}
                                class="form-control form-control-user" id="exampleInputEmail"
                                placeholder="Email Address"/>
                            </div>
                            <div class="form-group">
                                <input 
                                type="phone"
                                onChange={(e) => onChange("phone", e.target.value)}
                                class="form-control form-control-user" id="exampleInputEmail"
                                placeholder="Phone Number"/>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-6 mb-3 mb-sm-0">
                                    <input 
                                    type="password"
                                    onChange={(e) => onChange("password", e.target.value)}
                                     class="form-control form-control-user"
                                        id="exampleInputPassword" placeholder="Password"/>
                                </div>
                                <div class="col-sm-6">
                                    <input 
                                    type="password"
                                    onChange={(e) => onChange("passwordConfirmation", e.target.value)}
                                    class="form-control form-control-user"
                                    id="exampleRepeatPassword" placeholder="Repeat Password"/>
                                </div>
                            </div>
                            <a 
                            onClick={RegisterData}
                             class="btn btn-primary btn-user btn-block">
                                Register Account
                            </a>
                            <hr/>
                            <a href="index.html" class="btn btn-google btn-user btn-block">
                                <i class="fab fa-google fa-fw"></i> Register with Google
                            </a>
                            <a href="index.html" class="btn btn-facebook btn-user btn-block">
                                <i class="fab fa-facebook-f fa-fw"></i> Register with Facebook
                            </a>
                        </form>
                        <hr/>
                        <div class="text-center">
                            <a class="small" href="forgot-password.html">Forgot Password?</a>
                        </div>
                        <div class="text-center">
                            <a class="small" href="/login">Already have an account? Login!</a>
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

</div>
</div>
</div>
    );
}