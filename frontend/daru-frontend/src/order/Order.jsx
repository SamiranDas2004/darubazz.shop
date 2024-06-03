import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Order() {
  const [order, setOrder] = useState(null); // Use null as initial state
  const { id } = useParams(); // Call useParams as a function

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
    <div>
      {order.imageUrl && <img src={order.imageUrl} alt={order.productname} />}
      <h2>Order Details</h2>
      <p><strong>Product Name:</strong> {order.productname}</p>
      <p><strong>Price:</strong> ${order.price}</p>
      <p><strong>Brand:</strong> {order.brand}</p>
      <p><strong>Category:</strong> {order.category}</p>
      <button className=' bg-slate-700'>Buy now</button>
    </div>
  );
}

export default Order;
