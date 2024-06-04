import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Order() {
  const [order, setOrder] = useState(null); // Use null as initial state
  const { id } = useParams(); // Call useParams as a function
  const navigate=useNavigate()


  const handelNavigate=()=>{
    navigate('/order/address')
  }

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        // Fetch the order using the product ID
        const response = await axios.get(`http://localhost:8000/api/product/findbyid/${id}`);
        setOrder(response.data); // Ensure you're setting the product details
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchOrder();
  }, [id]);

  if (!order) {
    return <p>Loading...</p>; // Display loading state while data is being fetched
  }

  return (
    <div class="max-w-sm rounded overflow-hidden shadow-lg">
  <img class="w-full" src={order.imageUrl} alt="Sunset in the mountains"/>
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2"></div>
    <p class="text-gray-700 text-base">
     
    </p>
  </div>
  <div class="px-6 pt-4 pb-2">
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{order.price}</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{order.category}</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{order.brand}</span>
  </div>
  <button onClick={handelNavigate}>Buy</button>
</div>
  );
}

export default Order;
