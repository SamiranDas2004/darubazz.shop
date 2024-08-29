import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HoverRating from './Rate';
function AllProducts() {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    navigate(`/order/${id}`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/product/allproducts");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
    sortProducts(event.target.value);
  };

  const sortProducts = (order) => {
    const sortedProducts = [...products];
    if (order === 'highToLow') {
      sortedProducts.sort((a, b) => b.price - a.price); // Sort high to low
    } else if (order === 'lowToHigh') {
      sortedProducts.sort((a, b) => a.price - b.price); // Sort low to high
    }
    setProducts(sortedProducts);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-6">All Products</h2>
      <div className='grid grid-cols-6'>
        <div className="col-span-1 p-4 border-r">
          <div className="flex flex-col space-y-2">
            <label className="flex items-center">
              <input 
                type="radio" 
                name="sortOrder" 
                value="highToLow" 
                checked={sortOrder === 'highToLow'} 
                onChange={handleSortOrderChange}
                className="form-radio"
              />
              <span className="ml-2">High to Low</span>
            </label>
            <label className="flex items-center">
              <input 
                type="radio" 
                name="sortOrder" 
                value="lowToHigh" 
                checked={sortOrder === 'lowToHigh'} 
                onChange={handleSortOrderChange}
                className="form-radio"
              />
              <span className="ml-2">Low to High</span>
            </label>
          </div>
        </div>
        <div className="col-span-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              onClick={() => handleNavigate(product._id)}
              key={product._id} className="border rounded-lg p-4 cursor-pointer shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105">
              <div className="w-full h-48 overflow-hidden rounded-t-lg">
                <img src={product.imageUrl} alt={product.productname} className="w-full h-full object-contain" />
              </div>
              <HoverRating/>
              <h3 className="text-xl font-bold mt-2">{product.productname}</h3>
              <p><strong>Brand:</strong> {product.brand}</p>
              <p><strong>Price:</strong> {product.price}</p>
              <p><strong>Category:</strong> {product.category}</p>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
} 

export default AllProducts;
