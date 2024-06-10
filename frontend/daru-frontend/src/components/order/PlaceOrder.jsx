import React, { useEffect, useState } from 'react';
import {jwtDecode} from "jwt-decode";
import axios from 'axios';

function PlaceOrder() {
  const [price, setPrice] = useState(null); // Initialize price state

  useEffect(() => {
    const totalPrice = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('Token not found');
        return;
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      console.log(userId);

      try {
        const response = await axios.post("http://localhost:8000/api/order/payment", { userId });
        setPrice(response.data.totalProductPrice); // Assuming the API returns an object with totalProductPrice key
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching total price:', error.message);
      }
    };

    totalPrice();
  }, []);

  return (
    <div className=''>
      <div className='text-bold align-center justify-center'>
        {price !== null ? price : 'Loading...'}
        hello
      </div>
    </div>
  );
}

export default PlaceOrder;
