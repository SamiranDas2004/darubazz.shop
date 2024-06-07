import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useRef } from 'react';

function UpdateProduct() {
  const [productname, setProductname] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const fileInputRef = useRef(null);

  const { id } = useParams();
  console.log('id is ', id);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!(productname || price || category || brand || image || username)) {
      setMessage('All fields and image are required');
      return;
    }

    setLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('productname', productname);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('brand', brand);
    formData.append('imageUrl', image);
    formData.append('username', username);

    try {
      const response = await axios.put(
        `http://localhost:8000/api/product/update/${id}`,
        formData
      );

      if (response.status === 200) {
        setMessage('Product updated successfully!');
        setProductname('');
        setPrice('');
        setCategory('');
        setBrand('');
        setImage(null);
        setUsername('');
        fileInputRef.current.value = '';
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
    <>
      <div className="col-span-4">
        {message && <p>{message}</p>}
        <form onSubmit={handleUpdate}>
          <div>
            <label>User Name:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Product Name:</label>
            <input
              type="text"
              value={productname}
              onChange={(e) => setProductname(e.target.value)}
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <label>Category:</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div>
            <label>Brand:</label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>
          <div>
            <label>Image:</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              ref={fileInputRef}
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Updating Product...' : 'Update Product'}
          </button>
        </form>
      </div>
    </>
  );
}

export default UpdateProduct;
