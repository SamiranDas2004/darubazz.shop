import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function UserOrder() {
  const response = useSelector(state => state.products);
  const [products, setProducts] = useState([]);

 
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Your Orders</h2>
        {products.length > 0 ? (
          products.map(product => (
            <div key={product._id} className="flex items-center mb-6 border-b pb-4">
              <img
                src={product.imageUrl}
                alt={product.productname}
                className="w-32 h-32 object-cover rounded-md mr-6"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{product.productname}</h3>
                <p className="text-gray-600">{product.brand}</p>
                <p className="text-gray-800 font-semibold">₹{product.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">You have no orders yet.</p>
        )}
      </div>
    </div>
  );
}

export default UserOrder;
