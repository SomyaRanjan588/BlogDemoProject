import axios from "axios";
import React from "react";
import "../styles/index.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Viewproduct from "./viewproduct";

function Homepage() {
  let navigate = useNavigate();
  const logoutSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://127.0.0.1:8000/api/logout`).then((res) => {
      if (res.status === 200) {
        localStorage.removeItem("auth_name");
        localStorage.removeItem("auth_token");

        navigate(`/`);
      } else {
        console.log("token");
      }
    });
  };
  return (
    <div className="homepagemaindiv">
      <div className="headermaindiv">
        <div className="leftheadermaindiv">
          <h1>
          <Link to="/homepage" className="postlink">
          Welcome
          </Link>
          </h1>
          <h2>
            {" "}
            <Link to="/viewproduct" className="postlink">Posts</Link>
          </h2>
          <h3>
            {" "}
            <Link to="/addproduct" className="postlink">Add Post</Link>
          </h3>
        </div>
        <div className="rightheadermaindiv">
          <h2 onClick={logoutSubmit}>Logout</h2>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Homepage;
