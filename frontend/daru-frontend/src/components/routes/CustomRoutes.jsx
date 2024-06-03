import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from '../homePage/Home'
import AllProducts from '../allProducts/AllProducts'
import Order from '../../order/Order'
function CustomRoutes() {
  return (
    <div>

        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path="/product" element={<AllProducts/>} />
            <Route path='/order/:id' element={<Order/>} />
        </Routes>
    </div>
  )
}

export default CustomRoutes