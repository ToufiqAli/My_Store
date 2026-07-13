import React from 'react'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/LeftBar'
import Dashboard from '../Components/Dashboard'
import Orders from "../Components/Orders"
import { Routes, Route } from "react-router-dom";
 

const Admin = () => {
  return (
    <div>
       <Navbar />
       <Sidebar />
       <Routes>
        <Route path='/' element={<Dashboard />}></Route>
        <Route path='/orders' element={<Orders />}></Route>
        
       </Routes>



    </div>
  )
}

export default Admin