import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function Home() {
      const [products, setProducts] = useState([]);


       useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

   const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/products/${id}`)
      .then(() => setProducts(products.filter(p => p._id !== id)));
  };

     return (
    <div style={{ padding: "20px" }}>
      <h2>Product List</h2>
      <Link to="/create" >
        <button>Add Product</button>
      </Link>
      <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Image</th>
            <th>Quantity</th>
            <th>Rate</th>
            <th>Date</th>
            <th>status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, index) => (
            <tr key={p._id}>
              <td>{index + 1}</td>
              <td>{p.productName}</td>
              <td>
                {p.image && <img src={`http://localhost:5000${p.image}`} alt="" width="50" />}
              </td>
              <td>{p.quantity}</td>
              <td>{p.rate}</td>
              <td>{new Date(p.date).toLocaleDateString()}</td>
              <td>{p.status}</td>
              <td>
                <Link to={`/edit/${p._id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => handleDelete(p._id)} style={{ marginLeft: "10px" }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
  

