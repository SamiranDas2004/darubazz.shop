import React, { useState, useRef } from 'react';
import axios from 'axios';

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
  const [products, setProducts] = useState([]);

  const findProduct = async () => {
 


  
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

  return (
    <div className="grid grid-cols-5">
      <div className="col-span-1">
        <div className="grid">
          <div className="col-span-1">
            <div className="flex flex-col space-y-2">
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="sortOrder" 
                  value="yourProducts" 
                  onClick={findProduct}  // Call findProduct when radio button is clicked
                />
                <span className="ml-2">Your products</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-4">
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
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
            {loading ? 'Creating Product...' : 'Create Product'}
          </button>
        </form>
      </div>
      {/* <div className="grid col-span-5 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product._id} className="border p-4 cursor-pointer">
            <img src={product.imageUrl} alt={product.productname} className="w-full h-auto" />
            <h3 className="text-xl font-bold">{product.productname}</h3>
            <p><strong>Brand:</strong> {product.brand}</p>
            <p><strong>Price:</strong> {product.price}</p>
            <p><strong>Category:</strong> {product.category}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default CreateProduct;
