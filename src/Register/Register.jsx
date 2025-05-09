import React, { use, useEffect, useState } from 'react'
import './register.css'
import { Link, useNavigate } from 'react-router-dom'

import axios from 'axios';
import { toast } from 'react-toastify';
import { registerUser } from '../Service/authService';
const Register = () => {
  const [newUser,setNewUser]=useState({
    name:"",
    email:"",
    password:""
  });
  
  const navigate=useNavigate();
  

  const submitHandler=async(e)=>{

    e.preventDefault();
    const resgisterResponse= await registerUser(newUser);  
    if(resgisterResponse==201){
      toast.success("Registration completed. Please login..");
      navigate("/login");
    }else{
      toast.error("unable to register. Please try again");
    }  

  }

  return (
    <div className="container">
    <div className="row">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div className="card border-0 shadow rounded-3 my-5">
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-5 fw-light fs-5">Sign Up</h5>
            <form onSubmit={(e)=>submitHandler(e)}>
              <div className="form-floating mb-3">
                <input onChange={(e)=>setNewUser({...newUser,name:e.target.value})} type="text" className="form-control" id="floatingInput" placeholder="John Doe" required />
                <label htmlFor="floatingInput">Full Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={(e)=>setNewUser({...newUser,email:e.target.value})} type="email" className="form-control" id="floatingInput" placeholder="name@example.com" required />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-3">
              <input onChange={(e) => setNewUser({...newUser, password: e.target.value})} type="password" className="form-control" id="floatingPassword" placeholder="Password" required  />
                <label htmlFor="floatingPassword">Password</label>
              </div>

            
              <div className="d-flex justify-content-between">
                <button className="col-5 btn btn-outline-primary btn-login text-uppercase" type="submit">Sign
                  up</button>
                  <button className="col-5 btn btn-outline-danger btn-login text-uppercase" type="reset">Reset 
                  </button>
              </div>
              <div className="mt-4">
                Already have an account?<Link to={"/login"}>Sign In</Link>
              </div>
             
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Register