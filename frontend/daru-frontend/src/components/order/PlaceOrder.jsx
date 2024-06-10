import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function PlaceOrder() {
  const [price, setPrice] = useState(null); // Initialize price state
  const { totalPrice } = useParams();

  useEffect(() => {
    setPrice(totalPrice);
  }, [totalPrice]); // Set the price when totalPrice changes

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
