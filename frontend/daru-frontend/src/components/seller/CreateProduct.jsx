import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const CreateProduct = () => {
  const [productname, setProductname] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const findProduct = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.log("not logged in");
      return;
    }

    const decodedToken = jwtDecode(token);
    const username = decodedToken.username;



    navigate(`/seller/products/${username}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productname || !price || !category || !brand || !image) {
      setMessage('All fields and image are required');
      return;
    }

    const formData = new FormData();
    formData.append('productname', productname);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('brand', brand);
    formData.append('imageUrl', image);
    formData.append('username', username);

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/product/createProduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setMessage('Product created successfully!');
        setProductname('');
        setPrice('');
        setCategory('');
        setBrand('');
        setImage(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = null; // Clear the file input
        }
      } else {
        setMessage('Failed to create product');
      }
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getYourOrders = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.log("not logged in");
      return;
    }

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;
    console.log(userId);
    if (!userId) {
      console.log("userId not found");
      return;
    }
    navigate(`/yourOrders/${userId}`);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between">
      <div className="w-full md:w-1/4 flex flex-col mt-9 justify-start">
        <div className="flex flex-col space-y-4">
          <div>
            <label className="font-bold">Find Your Products:</label>
            <button
              onClick={findProduct}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Find Products
            </button>
          </div>
          <div>
            <label className="font-bold">Your Orders:</label>
            <button
              onClick={getYourOrders}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Your Orders
            </button>
          </div>
        </div>
      </div>

      <div className="w-full md:w-3/4 p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Create Products</h2>
        {message && <p className="text-red-500">{message}</p>}
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col space-y-4">
            <div>
              <label className="font-bold">User Name:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div>
              <label className="font-bold">Product Name:</label>
              <input
                type="text"
                value={productname}
                onChange={(e) => setProductname(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div>
              <label className="font-bold">Price:</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div>
              <label className="font-bold">Category:</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div>
              <label className="font-bold">Brand:</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div>
              <label className="font-bold">Image:</label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                ref={fileInputRef}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {loading ? 'Creating Product...' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
