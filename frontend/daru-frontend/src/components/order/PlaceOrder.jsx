import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { addProducts } from '../features/products/product.Slice';

function PlaceOrder() {
  const [price, setPrice] = useState(null); // Initialize price state
  const { totalPrice, contactNumber } = useParams();

  const products = useSelector(state => state.products); // Assuming 'products' is the part of state you dispatched
  const dispatch = useDispatch();

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

  const userDetails = localStorage.getItem("token");
  const decodedToken = jwtDecode(userDetails);
  const userId = decodedToken.userId;
  const username = decodedToken.username;
const navigate=useNavigate()

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
        key: 'rzp_test_0JAM9k2xU1i9q3', // Use your Razorpay key here
        amount: data.amount,
        currency: data.currency,
        name: 'Darubazz',
        description: 'Test Transaction',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFg8hUPv515mVxxp2BQuRULGOtEXygUqqvmg&s',
        order_id: data.id,
        handler: function (response) {
          // Handle successful payment
          alert(`Payment Successful. Payment ID: ${response.razorpay_payment_id}`);
          // Dispatch action to add products if needed
          const res =  axios.post('http://localhost:8000/api/order/', { products: products },{userId:userId});

console.log(res.data);
          navigate("/customerorders")

        },
        prefill: {
          name: username,
          email: email,
          contact: contactNumber
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Order Summary</h2>
        <div className="text-center text-lg mb-6">
          <span className="font-bold">Total Price:</span> ₹{price !== null ? price : 'Loading...'}
        </div>
        <button
          onClick={handlePayment}
          disabled={price === null}
          className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
            price === null ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
          } focus:outline-none focus:bg-blue-600`}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}

export default PlaceOrder;
