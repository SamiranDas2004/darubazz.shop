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
import OneProduct from '../seller/OneProduct'
import UpdateProduct from '../seller/UpdateProduct'
import Cart from '../cart/Cart'
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
            <Route path='/seller/products/:username' element={<OneProduct/>}/>

            <Route path='/seller/products/:username/:id' element={<UpdateProduct/>}/>
            <Route path='/cart/:userId' element={<Cart/>}/>
        </Routes>
    </div>
  )
}

export default CustomRoutes