import React, { useState } from "react";
import "../styles/login.css";
import Signinimage from "../assets/signup.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
function Loginpage() {
  let navigate = useNavigate();
  const [loginInput, SetLogin] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    e.persist();
    SetLogin({ ...loginInput, [e.target.name]: e.target.value });
  };
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  const loginSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: loginInput.email,
      password: loginInput.password,
    };
    axios
      .post(`http://127.0.0.1:8000/api/login`, data, axiosConfig)
      .then((res) => {
        if (res.status === 200) {
          navigate(`/homepage`);
          localStorage.setItem("auth_name", res.data.name);
          localStorage.setItem("auth_token", res.data.token);
        } else {
          swal("Error", res.data.errors, "error");
        }
      });
  };

  return (
    <>
      <div className="signinmaindiv">
        <div className="leftsigninmaindiv">
          <img src={Signinimage} alt="" className="signinimage" />
        </div>
        <div className="rightsigninmaindiv">
          <h1>Welcome to Signin Page</h1>
          <form className="signininnerform" onSubmit={loginSubmit}>
            <label className="labels">Email :</label>
            <br></br>
            <input
              type="text"
              name="email"
              placeholder="enter your email"
              className="inputfields"
              onChange={handleInput}
              value={loginInput.email}
            />
            <br></br>
            <label className="labels">Password :</label>
            <br></br>
            <input
              type="password"
              name="password"
              placeholder="enter your passoword"
              onChange={handleInput}
              value={loginInput.password}
              className="inputfields"
            />
            <br></br>

            <button type="submit">Signin</button>
          </form>
          <div className="signindiv">
            <p>Do not Have an account</p>
            <span>
              <Link to="/signup">Signup</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Loginpage;
