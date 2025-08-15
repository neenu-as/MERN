import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function Update() {

     const { id } = useParams();
  const [productName, setProductName] = useState("");
  const [image, setImage] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [rate, setRate] = useState("");
  const [date,setDate]=useState("");
    const [status,setStatus] =useState("active");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => {
        setProductName(res.data.productName);
        setQuantity(res.data.quantity);
        setRate(res.data.rate);
      // setDate(res.date?.split("T")[0]); // Format: YYYY-MM-DD
         setDate(new Date(res.data.date).toISOString().split("T")[0]);
        setStatus(res.data.status);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", productName);
    if (image) formData.append("image", image);
    formData.append("quantity", quantity);
    formData.append("rate", rate);
    formData.append("date", new Date(date).toISOString());
     formData.append("status", status);

    axios.put(`http://localhost:5000/api/products/${id}`, formData)
      .then(() => navigate("/"));
  };

  return (
    <div className="d-flex vh-100 bg-success justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-5">
     
      <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div style={{ maxWidth: "400px" }}>
       <h2 className="text-center">Edit Product</h2>
    

        <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required  className="form-control" /><br /><br />
        <input type="file" onChange={(e) => setImage(e.target.files[0])}  accept="image/*"/><br /><br />
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required  className="form-control"/><br /><br />
        <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} required  className="form-control"/><br /><br />
         <input
              type="date"
              id="date"
              name="date"
              required
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            /><br/><br/>
         <select  value={status} onChange={(e) => setStatus(e.target.value)}  className="form-control">
          {/* <option value="">all status</option> */}
          <option value="active" >active</option>
          <option value="inactive">inactive</option>
        </select><br /><br />
        <button type="submit">Update</button></div>
      </form>
    </div>
    </div>
    
  )
}
