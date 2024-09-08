import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {jwtDecode} from 'jwt-decode';

function UserOrder() {
  const response = useSelector(state => state.products);
  const latestResponse = response[response.length - 1];
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem('token');
        
  if (!token) {
    console.log('not logged in');
    return null;
  }

  const decodedToken = jwtDecode(token);
  const userId = decodedToken.userId;
  console.log('user is', userId);

  useEffect(() => {
    const showUserAllOrders = async () => {
      try {
        const userCartResponse = await axios.get(`https://darubazz-in.onrender.com/api/order/showuserorders/${userId}`);
        console.log(userCartResponse.data);

        const productsArray = userCartResponse.data.findResult.products;

        const showAllOrdersResponse = await axios.post("https://darubazz-in.onrender.com/api/order/showallorders", { productsIds: productsArray });
        console.log(showAllOrdersResponse.data);
        setProducts(showAllOrdersResponse.data.products);
      } catch (error) {
        console.log(error.message);
      }
    };

    if (userId) {
      showUserAllOrders();
    }
  }, [userId]);

  const cancelOrder = async (productId) => {
    try {
      console.log(productId);
      const response = await axios.post(`https://darubazz-in.onrender.com/api/order/cancelUserOrder`, { userId, productId });
      console.log(response.data);
      
      // Update the products state to remove the canceled product
      setProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
      setMessage("Product removed from the order successfully");
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log('this is products', products);
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Your Orders</h2>
        {message && <p className="text-green-600">{message}</p>}
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
              <div>
                <button onClick={() => cancelOrder(product._id)} className="bg-red-500 text-white px-4 py-2 rounded">Cancel</button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No Orders Yet</p>
        )}
      </div>
    </div>
  );
}

export default UserOrder;
