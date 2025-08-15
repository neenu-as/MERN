import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateProduct() {
  const [productName, setProductName] = useState("");
  const [image, setImage] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [rate, setRate] = useState("");
  const [status,setStatus] =useState("active");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("image", image);
    formData.append("quantity", quantity);
    formData.append("rate", rate);
    formData.append("status",status);

    axios.post("http://localhost:5000/api/products", formData)
      .then(() => navigate("/"));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" placeholder="Product Name" onChange={(e) => setProductName(e.target.value)} required /><br /><br />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} /><br /><br />
        <input type="number" placeholder="Quantity" onChange={(e) => setQuantity(e.target.value)} required /><br /><br />
        <input type="number" placeholder="Rate" onChange={(e) => setRate(e.target.value)} required /><br /><br />
        <select value={status} onChange={e => setStatus(e.target.value)}>
          {/* <option value={status}>all status</option> */}
          <option value="active">active</option>
          <option value="inactive">inactive</option>
        </select><br /><br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default CreateProduct;
