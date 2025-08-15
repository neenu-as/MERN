import { useState } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/signup", { name, email, password });
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (error) {
      // Safe error handling
      const message = error.response?.data?.message || error.message || "Something went wrong";
      alert(message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-secondary">
      <div className="bg-white p-3 rounded w-25">
    <form onSubmit={handleSubmit}>
      <h2>User Signup</h2>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="form-control mb-2"  required />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="form-control mb-2" required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="form-control mb-2"  required />
      <button className="btn btn-primary" type="submit">Signup</button>
       <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </form>
    </div>
    </div>
  );
}
