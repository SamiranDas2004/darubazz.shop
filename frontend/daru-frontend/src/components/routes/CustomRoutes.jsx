import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from '../homePage/Home'
import AllProducts from '../allProducts/AllProducts'
import Order from '../order/Order'
import Address from '../Address/Address'
import Registration from '../auth/Registration'
import Verify from '../auth/Verify'
import Login from '../auth/Login'
import CreateProduct from '../seller/CreateProduct'
function CustomRoutes() {
  return (
    <div>

        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path="/product" element={<AllProducts/>} />
            <Route path='/order/:id' element={<Order/>} />
            <Route path='/order/address' element={<Address/>}/>
            <Route path='/user/signup' element={<Registration/>}/>
            <Route path='/user/verification/:username'  element={<Verify/>}/>
            <Route path='/user/login' element={<Login/>}/>
            <Route path='/user/seller' element={<CreateProduct/>}/>
        </Routes>
    </div>
  )
}

export default CustomRoutes