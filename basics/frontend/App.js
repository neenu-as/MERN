import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Update from './Update';
import CreateProduct from './Createproduct';
import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import Dashboard from "./Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
          <Route path="/create" element={<CreateProduct/>}/>

<Route path="/edit/:id" element={<Update/>}/>

        <Route path="/dashboard" element={<Dashboard />} />
       <Route path="*" element={<Navigate to="/signup" />} />

      </Routes>
    </Router>
  );
}

export default App;
