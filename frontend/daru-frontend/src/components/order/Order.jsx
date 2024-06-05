import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Order() {
  const [order, setOrder] = useState(null);
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

  const handleBuy = async () => {
    try {
      const token = localStorage.getItem('token');
      // console.log("Token:", token); // Log the token to see if it's retrieved properly
      if (token) {
        navigate('/order/address');
        return;
      } else {
        navigate('/user/login');
      }
    } catch (error) {
      console.error("Error fetching token:", error); // Log any errors that occur
      throw new Error(error.message);
    }
  };
  
  

  if (!order) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
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
      <button onClick={handleBuy}>Buy</button>
    </div>
  );
}

export default Order;
