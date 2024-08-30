import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BasicRating from './Rate';

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // State for search input
  const navigate = useNavigate();
  const [value, setValue] = useState(3);

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

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter products based on search query
  const filteredProducts = products.filter(product =>
    product.productname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-3">All Products</h2>
      <div className="flex justify-end items-center">
        <form className="w-4/5 mb-2">
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search here"
              value={searchQuery} // Bind searchQuery to input
              onChange={handleSearchChange} // Update searchQuery on input change
            />
            <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Search
            </button>
          </div>
        </form>
      </div>
      <div className="grid grid-cols-6">
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
          {filteredProducts.map((product) => (
            <div
              onClick={() => handleNavigate(product._id)}
              key={product._id}
              className="border rounded-lg p-4 cursor-pointer shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105"
            >
              <div className="w-full h-48 overflow-hidden rounded-t-lg">
                <img src={product.imageUrl} alt={product.productname} className="w-full h-full object-contain" />
              </div>
              <div>
                <BasicRating value={product.rating} setValue={setValue} />
              </div>
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
