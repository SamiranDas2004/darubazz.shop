import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from "jwt-decode"



function Order() {
  const [order, setOrder] = useState(null);
  const [message,setMessage]=useState('')
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/product/findbyid/${id}`);
        setOrder(response.data);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchOrder();
  }, [id]);

 
  

  const handelCart = async () => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      console.log("User must be logged in");
      return;
    }
  
    try {
      const decodedToken = jwtDecode(token);
      console.log("User information from token", decodedToken.userId);
  
      const userId = decodedToken.userId;
      const productId = order._id;
  
      const response = await axios.post("http://localhost:8000/api/user/cart", {
        productId,
        userId
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      console.log(response.status);
  
      if (response.status === 200) {
        console.log(setMessage("Added to cart"));
      } else {
        setMessage("Cannot create the cart");
      }
  
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  if (!order) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      {message && <p>{message}</p>}
      <img className="w-full" src={order.imageUrl} alt="Product" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{order.name}</div>
        <p className="text-gray-700 text-base">{order.description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{order.price}</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{order.category}</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{order.brand}</span>
      </div>
      <button onClick={handelCart}>Add to cart</button>
    </div>
  );
}

export default Order;
