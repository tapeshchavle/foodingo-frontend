import React, { useContext, useState } from "react";
import "./login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login } from "../Service/authService";
import { toast } from "react-toastify";
import { StoreContext } from "../context/StoreContext";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const{setToken,loadCartData}= useContext(StoreContext);


  const submitHandler = async (e) => {
    e.preventDefault();
    let obj = {
      email: email,
      password: password,
    };

    try {
      const res = await login(obj);
      console.log(res);
      if (res.status == 200) {
        setToken(res.data.token);
        localStorage.setItem('token',res.data.token);
        await loadCartData(localStorage.getItem('token'));
        navigate("/");
      } else {
        toast.error("User Id is not found.");
      }
    } catch (error) {
      
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">
                Sign In
              </h5>
              <form onSubmit={(e) => submitHandler(e)}>
                <div className="form-floating mb-3">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                  />
                  <label for="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                  />
                  <label for="floatingPassword">Password</label>
                </div>

                <div className="d-flex justify-content-between">
                  <button
                    className="col-5 btn btn-outline-primary btn-login text-uppercase"
                    type="submit"
                  >
                    Sign in
                  </button>
                  <button
                    className="col-5 btn btn-outline-danger btn-login text-uppercase"
                    type="reset"
                  >
                    Reset
                  </button>
                </div>
                <div className="mt-4">
                  New account?<Link to={"/register"}>Sign Up</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
