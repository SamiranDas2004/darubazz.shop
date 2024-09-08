import axios from 'axios';
import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

function UpdateProduct() {
  const [productname, setProductname] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const { id } = useParams();

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!(productname || price || category || brand || imageUrl)) {
      setMessage('At least one field must be provided for update');
      return;
    }

    setLoading(true);
    setMessage('');

    const formData = new FormData();
    if (productname) formData.append('productname', productname);
    if (price) formData.append('price', price);
    if (category) formData.append('category', category);
    if (brand) formData.append('brand', brand);
    if (imageUrl) formData.append('imageUrl', imageUrl);

    // Debugging: Log formData entries
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      const response = await axios.put(
        `https://darubazz-in.onrender.com/api/product/update/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data' // Important to set this header
          }
        }
      );

      if (response.status === 200) {
        setMessage('Product updated successfully!');
        setProductname('');
        setPrice('');
        setCategory('');
        setBrand('');
        setImageUrl(null);
        fileInputRef.current.value = ''; // Clear the file input
      } else {
        setMessage('Failed to update product');
      }
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Update Your Products</h2>
      {message && <p className="mb-4 text-red-500">{message}</p>}
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            name='productname'
            type="text"
            value={productname}
            onChange={(e) => setProductname(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Brand</label>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              setImageUrl(file);
              console.log('Selected file:', file); // Debugging
            }}
            ref={fileInputRef}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? 'Updating Product...' : 'Update Product'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateProduct;
