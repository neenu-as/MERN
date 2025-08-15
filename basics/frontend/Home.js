import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [statusFilter, setStatusFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [stockFilter, setStockFilter] = useState("");

  // ✅ Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/products/${id}`)
      .then(() => setProducts(products.filter((p) => p._id !== id)));
  };

  useEffect(() => {
    let data = [...products];

    if (searchTerm.trim()) {
      data = data.filter((p) =>
        p.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      data = data.filter((p) => p.status === statusFilter);
    }

    if (fromDate) {
      data = data.filter((p) => new Date(p.date) >= new Date(fromDate));
    }

    if (toDate) {
      data = data.filter((p) => new Date(p.date) <= new Date(toDate));
    }

    if (stockFilter === "in") {
      data = data.filter((p) => p.quantity > 0);
    } else if (stockFilter === "out") {
      data = data.filter((p) => p.quantity === 0);
    }

    setFilteredProducts(data);
    setCurrentPage(1); // ✅ Reset to first page when filters change
  }, [searchTerm, statusFilter, fromDate, toDate, stockFilter, products]);

  // ✅ Pagination Logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="d-flex vh-100 bg-success justify-content-center align-items-center">
      <div className="w-100 bg-white rounded p-4">
      <h2 className="text-center mb-5">Product List</h2>
      <Link to="/create" className="btn btn-primary mb-2">
       Add Product
      </Link>

      {/* Filter Row */}
      <div className="row mb-3">
        <div className="col-md-3 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="col-md-2 mb-2">
          <select
            className="form-control"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="col-md-2 mb-2">
          <input
            type="date"
            className="form-control"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>

        <div className="col-md-2 mb-2">
          <input
            type="date"
            className="form-control"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>

        <div className="col-md-3 mb-2">
          <select
            className="form-control"
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
          >
            <option value="">All Stock</option>
            <option value="in">In Stock</option>
            <option value="out">Out of Stock</option>
          </select>
        </div>
      </div>

      <table className="table table-bordered table-striped text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Image</th>
            <th>Quantity</th>
            <th>Rate</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((p, index) => (
              <tr key={p._id}>
                <td>{startIndex + index + 1}</td>
                <td>{p.productName}</td>
                <td>
                  {p.image && (
                    <img
                      src={`http://localhost:5000${p.image}`}
                      alt=""
                      width="50"
                      height='50'
                    />
                  )}
                </td>
                <td>{p.quantity}</td>
                <td>{p.rate}</td>
                <td>{new Date(p.date).toLocaleDateString()}</td>
                <td>{p.status}</td>
                <td>
                  <Link to={`/edit/${p._id}`}>
                    <button>Edit</button>
                  </Link>
                  <button
                    onClick={() => handleDelete(p._id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ✅ Pagination Controls */}
      <div style={{ marginTop: "20px" }}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            style={{
              margin: "5px",
              backgroundColor: currentPage === index + 1 ? "lightblue" : "",
            }}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
    </div>
    
  );
}
