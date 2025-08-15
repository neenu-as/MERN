
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './Home';

import Update from './Update';
import CreateProduct from './Createproduct';
import Signup from './Signup';
import Login from './Login';
function App() {
  return (
  
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home/>}/>
   
    <Route path="/create" element={<CreateProduct/>}/>

<Route path="/edit/:id" element={<Update/>}/>

 <Route path='/register' element={<Signup/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
  
    </Routes>
    </BrowserRouter>
  );
}

export default App;
