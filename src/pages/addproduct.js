import React, { useState } from "react";
import "../styles/index.css";
import Uploadimage from "../assets/upload.jpg";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Homepage from "./homepage";

function Addproduct() {
  let navigate = useNavigate();
  const [productInput, SetProduct] = useState({
    title: "",
    desc: "",
    postid: "",
  });
  const [picture, SetPicture] = useState([]);
  const handleInput = (e) => {
    e.persist();
    SetProduct({ ...productInput, [e.target.name]: e.target.value });
  };
  const handleImage = (e) => {
    SetPicture({ image: e.target.files[0] });
  };
  const [allcheckbox, setCheckboxes] = useState([]);
  const handleCheckbox = (e) => {
    e.persist();
    setCheckboxes({ ...allcheckbox, [e.target.name]: e.target.checked });
  };
  const [postidbox, setPostId] = useState([]);
  const handleTagbox = (e) => {
    e.persist();
    setPostId({ ...postidbox, [e.target.name]: e.target.checked });
  };
  const [postid, setPostid] = useState([]);
  const submitProduct = (e) => {
    e.preventDefault();
    let tagid;

    const formData = new FormData();
    const checkData = new FormData();
    formData.append("image", picture.image);
    formData.append("title", productInput.title);
    formData.append("desc", productInput.desc);
    formData.append("postid", postidbox.postid ? "100" : "0");
    checkData.append("fashion", allcheckbox.fashion ? "1" : "0");
    checkData.append("technology", allcheckbox.technology ? "1" : "0");
    checkData.append("personal_blog", allcheckbox.personal_blog ? "1" : "0");

    checkData.append(
      "innovation_idea",
      allcheckbox.innovation_idea ? "1" : "0"
    );

    axios.post(`http://127.0.0.1:8000/api/save`, formData).then((res) => {
      if (res.data === "data added successfully") {
        swal("Success", res.data, "success");
        navigate(`/viewproduct`);
      } else {
        swal("Warning", "Please fill all the details", "warning");
      }
    });
    axios.post(`http://127.0.0.1:8000/api/savetag`, checkData).then((res) => {
      tagid = res.data.id;
    });
  };

  return (
    <div>
      <Homepage />
      <div className="addproductmaindiv">
        <div className="addproductleftdiv">
          <img src={Uploadimage} alt="" className="uploadimages" />
        </div>
        <div className="addproductrightdiv">
          <h1>Add Your Post</h1>
          <form encType="multipart/form-data" onSubmit={submitProduct}>
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
            <label className="labels">PostId : </label>
            <input
              type="checkbox"
              name="postid"
              onChange={handleTagbox}
              defaultChecked={postidbox.postid === 1 ? true : false}
            />
            <br></br>
            <label className="labels">Tags:</label>
            <br></br>
            <input
              type="checkbox"
              name="fashion"
              onChange={handleCheckbox}
              defaultChecked={allcheckbox.fashion === 1 ? true : false}
            />
            Fashion
            <input
              type="checkbox"
              name="technology"
              onChange={handleCheckbox}
              defaultChecked={allcheckbox.technology === 1 ? true : false}
            />
            Technology
            <input
              type="checkbox"
              name="personal_blog"
              onChange={handleCheckbox}
              defaultChecked={allcheckbox.personal_blog === 1 ? true : false}
            />
            Personal Blog<br></br>
            <input
              type="checkbox"
              name="innovation_idea"
              onChange={handleCheckbox}
              defaultChecked={allcheckbox.innovation_idea === 1 ? true : false}
            />
            Innovation Idea<br></br>
            <label className="labels">Upload your image:</label>
            <br></br>
            <input
              type="file"
              name="image"
              onChange={handleImage}
              className="filefields"
            />
            <br></br>
            <button type="submit">Upload</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Addproduct;
