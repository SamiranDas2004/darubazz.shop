import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { jwtDecode  } from 'jwt-decode';
function Address() {
  const navigate = useNavigate();
  const { totalPrice } = useParams();
  const [address, setAddress] = useState({
    username: '',
    city: '',
    state: '',
    zipcode: '',
    location: '',
    contactNumber:''
  });

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Submit address information
      const addressResponse = await axios.post(
        "http://localhost:8000/api/address/orderaddress",
        address
      );
      console.log(addressResponse.data);

      // Handle total payment
      const token=localStorage.getItem('token')
      const decodeJwt=jwtDecode(token)
      const userId=decodeJwt.userId

      const paymentResponse = await axios.post(
        `http://localhost:8000/api/order/payment/${totalPrice}`,{userId}
      );

      if (!paymentResponse) {
        console.log("Error in payment post");
        return;
      }

      navigate(`/payment/${totalPrice}/${address.contactNumber}/${address.username}`);
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Enter Your Address</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={address.username}
            onChange={(e) => setAddress({ ...address, username: e.target.value })}
            type="text"
            className="block w-full px-4 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Username"
            required
          />
          <input
            value={address.location}
            onChange={(e) => setAddress({ ...address, location: e.target.value })}
            type="text"
            className="block w-full px-4 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Location"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              value={address.state}
              onChange={(e) => setAddress({ ...address, state: e.target.value })}
              type="text"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="State"
              required
            />
            <input
              value={address.zipcode}
              onChange={(e) => setAddress({ ...address, zipcode: e.target.value })}
              type="text"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Zipcode"
              required
            />
          </div>
          <input
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            type="text"
            className="block w-full px-4 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="City"
            required
          />
           <input
            value={address.contactNumber}
            onChange={(e) => setAddress({ ...address, contactNumber: e.target.value })}
            type="text"
            className="block w-full px-4 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Contact Number"
            required
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Address;
