import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import {Button} from '@mui/material'



function OneProduct() {
const [products,setProducts]=useState([])
const {username}=useParams()
console.log(username);

useEffect(()=>{
  const findProduct = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/product/yourproducts', {
          params: { username } 
      });

      if (response.data) {
        setProducts(response.data);
      } else {
        console.log("Didn't get any product");
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  findProduct()
},[username])

const handelDelete=async(id)=>{
  const response=await axios.delete(`http://localhost:8000/api/product/delete/${id}`)
  console.log(response.data);
}


const navigate=useNavigate()

const handelNavigate=(id)=>{
  navigate(`/seller/products/${username}/${id}`)
}

  return (
    <>
    <h1>hello</h1>
    <div> <div className=" sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              
              key={product._id} className="border p-4 cursor-pointer">
              <img src={product.imageUrl} alt={product.productname} className="w-full h-auto" />
              <h3 className="text-xl font-bold">{product.productname}</h3>
              <p><strong>Brand:</strong> {product.brand}</p>
              <p><strong>Price:</strong> {product.price}</p>
              <p><strong>Category:</strong> {product.category}</p>
            <button
            onClick={() => handelDelete(product._id)}
            >Delete</button>
            <Button 
            onClick={()=> handelNavigate(product._id)}
            >update</Button>
            </div>
          ))}
        </div></div>
      </>
  )
}

export default OneProduct