import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function YourOrders() {
  const [orders, setOrders] = useState([]);
  const { userId } = useParams();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post(`http://localhost:8000/api/order/orders/${userId}`);
        if (!response.data) {
          console.log("Error in POST method");
        }
        console.log(response.data);
        setOrders(response.data);
      } catch (error) {
        throw new Error(error.message);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <div key={index} className="border rounded-lg p-4 mb-4 shadow-sm">
            <div className="flex items-center mb-4">
              <img src={order.productId.imageUrl} alt={order.productId.productname} className="w-20 h-20 object-cover rounded-md mr-4" />
              <div>
                <h2 className="text-lg font-semibold">{order.productId.productname}</h2>
                <p className="text-gray-600"><strong>Brand:</strong> {order.productId.brand}</p>
                <p className="text-gray-600"><strong>Category:</strong> {order.productId.category}</p>
                <p className="text-gray-600"><strong>Price:</strong> {order.price}</p>
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">Confirm Order</button>
              <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">Cancel Order</button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No orders found.</p>
      )}
    </div>
  );
}

export default YourOrders;
