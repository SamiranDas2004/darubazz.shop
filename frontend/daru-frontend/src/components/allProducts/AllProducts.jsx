import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@headlessui/react';

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const params = useParams();
  const navigate = useNavigate();

  const handelNavigate = (id) => {
    navigate(`/order/${id}`);
  }

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
    <>
      <h2>All Products</h2>
      <div className='grid grid-cols-6'>
        <div className="grid col-span-1">
          <div className="flex flex-col space-y-2">
            <label className="flex items-center">
              <input 
                type="radio" 
                name="sortOrder" 
                value="highToLow" 
                checked={sortOrder === 'highToLow'} 
                onChange={handleSortOrderChange}
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
              />
              <span className="ml-2">Low to High</span>
            </label>
          </div>
        </div>
        <div className="grid col-span-5 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              onClick={() => handelNavigate(product._id)}
              key={product._id} className="border p-4 cursor-pointer">
              <img src={product.imageUrl} alt={product.productname} className="w-full h-auto" />
              <h3 className="text-xl font-bold">{product.productname}</h3>
              <p><strong>Brand:</strong> {product.brand}</p>
              <p><strong>Price:</strong> {product.price}</p>
              <p><strong>Category:</strong> {product.category}</p>
            
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AllProducts;
