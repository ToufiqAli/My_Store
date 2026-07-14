import React from 'react'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/LeftBar'
import Dashboard from '../Components/Dashboard'
import Orders from "../Components/Orders"
import Product from "../Components/ProductsPage"
import Customers from "../Components/customerPage"
import Analysics from "../Components/"
import Analysics from "../Components/Analysics"
import { Routes, Route } from "react-router-dom";
 

const Admin = () => {
  return (
    <div>
       <Navbar />
       <Sidebar />
       <Routes>
        <Route path='/' element={<Dashboard />}></Route>
        <Route path='/orders' element={<Orders />}></Route>
        <Route path='/products' element={<Product />}></Route>
        <Route path='/customers' element={<Customers />}></Route>
        <Route path = '/Analysics' element = {<Analysics />}></Route>
        
       </Routes>



    </div>
  )
}

export default Admin