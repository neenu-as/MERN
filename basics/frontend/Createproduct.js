import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateProduct() {
  const [productName, setProductName] = useState("");
  const [image, setImage] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [rate, setRate] = useState("");
  const [date,setDate]=useState("");
  const [status,setStatus] =useState("active");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("image", image);
    formData.append("quantity", quantity);
    formData.append("rate", rate);
    formData.append("date", date);
    formData.append("status",status);

    axios.post("http://localhost:5000/api/products", formData)
      .then(() => navigate("/"));
  };

  return (
 <div className="d-flex vh-100 bg-success justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-5">
        
      <h2 className="text-center">Create Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div style={{ maxWidth: "400px" }}>
        <input type="text"
         placeholder="Product Name" 
         onChange={(e) => setProductName(e.target.value)} 
         required 
         className="form-control"/>
         <br /><br />

        <input type="file" 
        onChange={(e) => setImage(e.target.files[0])}
         accept="image/*"
         className="form-control"/>
         <br /><br />



        <input type="number"
         placeholder="Quantity"
          onChange={(e) => setQuantity(e.target.value)} 
          required className="form-control"/><br /><br />


        <input type="number"
         placeholder="Rate"
          onChange={(e) => setRate(e.target.value)}
           required className="form-control" /><br /><br />


            <input
              type="date"
              id="date"
              name="date"
              required
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            /><br/><br/>
        <select value={status}
         onChange={e => setStatus(e.target.value)}
          className="form-control">
         
          <option value="active">active</option>
          <option value="inactive">inactive</option>
        </select><br /><br />


        <button type="submit">Save</button>
        </div>
      </form>
      </div>
    </div>
    
  );
}

export default CreateProduct;
