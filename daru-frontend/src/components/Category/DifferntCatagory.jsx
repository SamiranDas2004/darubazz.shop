import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { category } = useParams(); // Extracting category from URL parameters

  useEffect(() => {
    const handleCategory = async () => {
      try {
        const response = await axios.get(`https://darubazz-in.onrender.com/api/product/category/${category}`);
        console.log(response.status);
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (category) {
      handleCategory();
    }
  }, [category]); // Re-run effect when category changes

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Products in {category} Category</h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <div key={product._id} className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-full h-48 overflow-hidden rounded-t-lg">
                <img className="w-full h-full object-contain" src={product.imageUrl} alt={product.productname} />
              </div>
              <h2 className="text-lg font-semibold mb-2">{product.productname}</h2>
              <p className="text-gray-600 mb-2">Brand: {product.brand}</p>
              <p className="text-gray-800 font-bold">Price: {product.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No products found</p>
      )}
    </div>
  );
};

export default ProductList;
