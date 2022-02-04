import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/index.css";
import swal from "sweetalert";

function Productshow() {
  const params = useParams();
  const [product, setProduct] = useState([]);
  const [showcomment, setShowComment] = useState([]);
  console.log("comment id", showcomment);
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/productdetails/${params.id}`)
      .then((res) => {
        setProduct(res.data);
      });
  }, []);
  // Add comment code

  const [productInput, SetProduct] = useState({
    comment: "",
  });
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/showcomments`)
      .then((res) => {
        setShowComment(res.data)
      });
  }, []);

  const handleInput = (e) => {
    e.persist();
    SetProduct({ ...productInput, [e.target.name]: e.target.value });
  };
  

  const submitComment = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("comment", productInput.comment);
    axios.post(`http://127.0.0.1:8000/api/comments`, formData).then((res) => {
      if (res.data === "Comment added successfully") {
        swal("Success", res.data, "success");
      }
    });
  };

  return (
    <div className="productshowmaindiv">
      <div className="productmapdiv">
        {product.map((item) => (
          <div key={item.id} className="productmaininnerdiv">
            <img
              src={"http://127.0.0.1:8000/storage/" + item.image}
              className="productmapimage"
            />
            <span>
              <p>Post Title :</p>
              <h1>{item.title}</h1>
            </span>

            <span className="secondspan">
              <h3>Post Description :</h3>
              <h2>{item.description}</h2>
            </span>

            <div>
              <form
                encType="multipart/form-data"
                onSubmit={submitComment}
                id="formsubmit"
              >
                <label className="productshowlabels">Comment:</label>
                <br></br>
                <textarea
                  type="text"
                  name="comment"
                  placeholder="Enter your comment"
                  onChange={handleInput}
                  value={productInput.comment}
                  className="productshowinputfields"
                />
                <br></br>
                <button
                  type="submit"
                  className="submit"
                 
                >
                  submit
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
      <div className="seecommentdiv" style={{"marginTop":"20px"}}>
        <h2>See All the comments</h2>
        {showcomment.map((comment) => (
          <div key={comment.id} className="commentmaindiv">
            <h3>{comment.comment}</h3>
         
          </div>
        ))}
      </div>
    </div>
  );
}

export default Productshow;
