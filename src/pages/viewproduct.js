import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/index.css";
import Grid from "@mui/material/Grid";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Homepage from "./homepage";

function Viewproduct() {
  let navigate = useNavigate();
  const params = useParams();
  console.log(params);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/show`).then((res) => {
      console.log(res.data);
      setProduct(res.data);
    });
  }, []);
  const deleteitem = (e, id) => {
    e.preventDefault();
    // const clicked = id;
    // console.log(clicked)
    // const removeid = document.getElementById("viewproductid");
    // console.log(removeid)

    axios.delete(`http://127.0.0.1:8000/api/delete/${id}`).then((res) => {
      swal("Success", res.data, "success");
      navigate(`/homepage`);
    });
  };

  return (
    <div>
      <Homepage />
      <div className="viewproductparentdiv">
        <Grid container spacing={3}>
          {product.map((item) => (
            <Grid item key={item.id} >
              <div className="viewproductinnerdiv" id="viewproductid">
                <div>
                  <img src={"http://127.0.0.1:8000/storage/" + item.image} />
                </div>
                <div className="producttextdiv">
                  <h4>{item.title}</h4>
                  <h3>{item.description}</h3>
                </div>
                <div className="icondiv">
                  <span>
                    <MdDelete
                      size="22px"
                      color="#2c2d2e"
                      onClick={(e) => deleteitem(e, item.id)}
                    />
                  </span>
                  <span>
                    <Link to={"/editproduct/" + item.id}>
                      {" "}
                      <AiFillEdit size="22px" color="#2c2d2e" />
                    </Link>
                  </span>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default Viewproduct;
