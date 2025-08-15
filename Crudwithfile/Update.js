import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function Update() {

     const { id } = useParams();
  const [productName, setProductName] = useState("");
  const [image, setImage] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [rate, setRate] = useState("");
    const [status,setStatus] =useState("active");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => {
        setProductName(res.data.productName);
        setQuantity(res.data.quantity);
        setRate(res.data.rate);
        setStatus(res.data.status);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("image", image);
    formData.append("quantity", quantity);
    formData.append("rate", rate);
     formData.append("status", status);

    axios.put(`http://localhost:5000/api/products/${id}`, formData)
      .then(() => navigate("/"));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required /><br /><br />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} /><br /><br />
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required /><br /><br />
        <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} required /><br /><br />
         <select  value={status} onChange={(e) => setStatus(e.target.value)}>
          {/* <option value="">all status</option> */}
          <option value="active" >active</option>
          <option value="inactive">inactive</option>
        </select><br /><br />
        <button type="submit">Update</button>
      </form>
    </div>
  )
}
