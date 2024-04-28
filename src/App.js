// import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Employee from './Components/Employee';
import Attendence from './Components/Attendence';
import Navbar from './Components/Navbar';
import Advance from './Components/Advance';
import Leave from './Components/Leave';
import Salary from './Components/Salary';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
       <Navbar/>
      <Routes>
        <Route path="/" element={<Employee/>}/>
        <Route path="/Attendence" element={<Attendence/>}/>
        <Route path="/Advance" element={<Advance/>}/>
        <Route path="/Leave" element={<Leave/>}/>
        <Route path="/Salary" element={<Salary/>}/>

      </Routes>
    </BrowserRouter>
    </div>
  );
}


export default App;
