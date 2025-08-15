import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login", { email, password });
      localStorage.setItem("token", res.data.token);

      if (res.data.role === "admin") navigate("/dashboard");
      else navigate("/home");
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
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="form-control mb-2" required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}  className="form-control mb-2" required />
      <button  className="btn btn-primary" type="submit">Login</button>
    </form>
    </div></div>
  );
}
