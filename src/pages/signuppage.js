import React, { useState } from "react";
import "../styles/index.css";
import { Link } from "react-router-dom";
import Signupimage from "../assets/signup.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
function Signuppage() {
  let navigate = useNavigate();
  const [registerInput, SetRegister] = useState({
    name: "",
    email: "",
    password: "",
    c_password: "",
    error_list: [],
  });
  const handleInput = (e) => {
    e.persist();
    SetRegister({ ...registerInput, [e.target.name]: e.target.value });
  };

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  const registerSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: registerInput.name,
      email: registerInput.email,
      password: registerInput.password,
      c_password: registerInput.c_password,
    };
    axios
      .post(`http://127.0.0.1:8000/api/register`, data, axiosConfig)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          navigate(`/`);
          swal("Success", res.data.message, "success");
        } else {
          // SetRegister({
          //   ...registerInput,
          //   error_list: res.data.validation_errors.name
          // });
          // console.log(registerInput.error_list);
          swal("Warning", "Please fill all the details", "warning");
        }
      });

    // try {

    // } catch (res) {
    //   SetRegister({
    //         ...registerInput,
    //         error_list: res.data.validation_errors,
    //       });

    // }
  };

  return (
    <>
      <div className="signupmaindiv">
        <div className="leftsignupmaindiv">
          <img src={Signupimage} alt="" className="signupimage" />
        </div>
        <div className="rightsignupmaindiv">
          <h1>Welcome to Signup Page</h1>
          <form className="signupinnerform" onSubmit={registerSubmit}>
            <label className="labels">Name :</label>
            <br></br>
            <input
              type="text"
              name="name"
              placeholder="enter your name"
              onChange={handleInput}
              value={registerInput.name}
              className="inputfields"
            />
            <br></br>

            <label className="labels">Email :</label>
            <br></br>
            <input
              type="text"
              name="email"
              placeholder="enter your email"
              onChange={handleInput}
              value={registerInput.email}
              className="inputfields"
            />
            <br></br>

            <label className="labels">Password :</label>
            <br></br>
            <input
              type="password"
              name="password"
              placeholder="enter your passoword"
              onChange={handleInput}
              value={registerInput.password}
              className="inputfields"
            />
            <br></br>

            <label className="labels">Confirm Password :</label>
            <br></br>
            <input
              type="password"
              name="c_password"
              placeholder="confirm your password"
              onChange={handleInput}
              value={registerInput.c_password}
              className="inputfields"
            />
            <br></br>

            <button type="submit">Sign Up</button>
          </form>
          <div className="logindiv">
            <p>Already Have an account</p>
            <span>
              <Link to="/">Signin</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signuppage;
