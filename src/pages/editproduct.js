import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/index.css";
import Uploadimage from "../assets/upload.jpg";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Editproduct() {
  let navigate = useNavigate();
  const [productInput, SetProduct] = useState({
    title: "",
    desc: "",
  });
  const [picture, SetPicture] = useState([]);
  const handleInput = (e) => {
    e.persist();
    SetProduct({ ...productInput, [e.target.name]: e.target.value });
  };
  const handleImage = (e) => {
    SetPicture({ image: e.target.files[0] });
  };
  const params = useParams();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/edit/${params.id}`).then((res) => {
      SetProduct(res.data.product);
    });
  }, []);

  const updateProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", picture.image);
    formData.append("title", productInput.title);
    formData.append("desc", productInput.desc);
    axios
      .post(`http://127.0.0.1:8000/api/update/${params.id}`, formData)
      .then((res) => {
        if (res.data === "data updated successfully") {
          swal("Success", res.data, "success");
          navigate(`/viewproduct`);
        } else {
          swal("Warning", "Please fill all the details", "warning");
        }
      });
  };

  return (
    <div>
      <div className="addproductmaindiv">
        <div className="addproductleftdiv">
          <img src={Uploadimage} alt="" className="uploadimages" />
        </div>
        <div className="addproductrightdiv">
          <h1>Edit Your Post</h1>
          <form encType="multipart/form-data" onSubmit={updateProduct}>
            <label className="labels">Title:</label>
            <br></br>
            <input
              type="text"
              name="title"
              placeholder="enter your title"
              onChange={handleInput}
              value={productInput.title}
              className="inputfields"
            />
            <br></br>
            <label className="labels">Description:</label>
            <br></br>
            <textarea
              type="text"
              name="desc"
              placeholder="enter your description"
              onChange={handleInput}
              value={productInput.desc}
              className="textfields"
            />
            <br></br>
            <label className="labels">Upload your image:</label>
            <br></br>
            <input type="file" name="image" onChange={handleImage} />
            <img
              src={"http://127.0.0.1:8000/storage/" + productInput.image}
              style={{ height: "80px" }}
            />
            <br></br>

            <button type="submit">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Editproduct;
