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
import Pagination from "./pagination";
import productshow from "./productshow";

function Viewproduct() {
  let navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState([]);
  const productlength = product.length;
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/show`).then((res) => {
      setProduct(res.data);
    });
  }, []);
  const deleteitem = (e, id) => {
    e.preventDefault();

    axios.delete(`http://127.0.0.1:8000/api/delete/${id}`).then((res) => {
      swal("Success", res.data, "success");
      navigate(`/homepage`);
    });
  };
  const productshow = (e, id) => {
    e.preventDefault();
    navigate(`/productshow/` + id);
  };

  //Pagination code
  const [showPerPage, setShowPerPage] = useState(4);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });

  const paginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };

  return (
    <div>
      <div>
        <div className="viewproductparentdiv">
          <Homepage />
          <div className="viewproductgriddiv">
            <Grid container spacing={5}>
              {product.slice(pagination.start, pagination.end).map((item) => (
                <Grid
                  item
                  key={item.id}
                  lg={3}
                  md={4}
               
                >
                  <div className="viewproductinnerdiv" id="viewproductid">
                    <div>
                      <img
                        src={"http://127.0.0.1:8000/storage/" + item.image}    onClick={(e) => productshow(e, item.id)}
                      />
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
        <div className="paginationdiv">
          <Pagination
            showPerPage={showPerPage}
            paginationChange={paginationChange}
            total={productlength}
          />
        </div>
      </div>
    </div>
  );
}

export default Viewproduct;
