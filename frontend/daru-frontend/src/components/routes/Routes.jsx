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
import PlaceOrder from '../order/PlaceOrder'
import YourOrders from '../seller/YourOrders'
import DifferntCatagory from '../Category/DifferntCatagory'
import UserOrder from '../order/UserOrder'
function CustomRoutes() {
  return (
    <div>

        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path="/product" element={<AllProducts/>} />
            <Route path='/order/:id' element={<Order/>} />
            <Route path='/order/address/:totalPrice' element={<Address/>}/>
            <Route path='/user/signup' element={<Registration/>}/>
            <Route path='/user/verification/:username'  element={<Verify/>}/>
            <Route path='/user/login' element={<Login/>}/>
            <Route path='/user/seller' element={<CreateProduct/>}/>
            <Route path='/seller/products/:username' element={<OneProduct/>}/>
            <Route path="/payment/:totalPrice/:contactNumber/:username" element={<PlaceOrder />} />
            <Route path='/seller/products/:username/:id' element={<UpdateProduct/>}/>
            <Route path='/cart/:userId' element={<Cart/>}/>
            <Route path='/yourOrders/:userId' element={<YourOrders/>}/>
            <Route path='/:category' element={<DifferntCatagory/>} />
            <Route path='/:category' element={<DifferntCatagory/>} />
            <Route path='/:category' element={<DifferntCatagory/>} />
            <Route path='/:category' element={<DifferntCatagory/>} />
            <Route path='/:category' element={<DifferntCatagory/>} />
            <Route path='/:category' element={<DifferntCatagory/>} />
            <Route path='/customerorders' element={<UserOrder/>} />
        </Routes>
    </div>
  )
}

export default CustomRoutes