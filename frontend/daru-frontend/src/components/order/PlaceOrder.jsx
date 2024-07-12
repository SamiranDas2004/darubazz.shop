import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function PlaceOrder() {
  const [price, setPrice] = useState(null); // Initialize price state
  const { totalPrice } = useParams();

  useEffect(() => {
    setPrice(totalPrice);

    // Dynamically add Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Cleanup script when component unmounts
    };
  }, [totalPrice]);

  const handlePayment = async () => {
    try {
      const orderData = {
        amount: price * 100, // Razorpay requires the amount in paise
        currency: 'INR',
        receipt: 'receipt_order_74394',
        payment_capture: 1 // Auto capture
      };

      const { data } = await axios.post('http://localhost:8000/api/payment/payment', orderData);

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY, // Use your Razorpay key here
        amount: data.amount,
        currency: data.currency,
        name: 'Your Company Name',
        description: 'Test Transaction',
        image: 'https://example.com/your_logo',
        order_id: data.id,
        handler: function (response) {
          alert(`Payment Successful. Payment ID: ${response.razorpay_payment_id}`);
        },
        prefill: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          contact: '9999999999'
        },
        notes: {
          address: 'Razorpay Corporate Office'
        },
        theme: {
          color: '#3399cc'
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className=''>
      <div className='text-bold align-center justify-center'>
        {price !== null ? price : 'Loading...'}
      </div>
      <button onClick={handlePayment} disabled={price === null}>
        Pay Now
      </button>
    </div>
  );
}

export default PlaceOrder;
