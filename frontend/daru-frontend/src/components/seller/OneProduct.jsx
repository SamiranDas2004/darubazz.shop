import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@mui/material';

function OneProduct() {
  const [products, setProducts] = useState([]);
  const { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const findProduct = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/product/yourproducts', {
          params: { username }
        });

        if (response.data) {
          setProducts(response.data);
        } else {
          console.log("Didn't get any product");
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    findProduct();
  }, [username]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/product/delete/${id}`);
      console.log(response.data);
      setProducts(products.filter(product => product._id !== id)); // Remove deleted product from state
    } catch (error) {
      console.error("Failed to delete product:", error.message);
    }
  };

  const handleNavigate = (id) => {
    navigate(`/seller/products/${username}/${id}`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
   <h2 className="text-2xl font-bold text-center mb-6">Your Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
           <div className="w-full h-48 overflow-hidden rounded-t-lg">
                <img className="w-full h-full object-contain" src={product.imageUrl} alt={product.productname} />
              </div>
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{product.productname}</h3>
              <p className="text-gray-700"><strong>Brand:</strong> {product.brand}</p>
              <p className="text-gray-700"><strong>Price:</strong> {product.price}</p>
              <p className="text-gray-700"><strong>Category:</strong> {product.category}</p>
              <div className="mt-4 flex space-x-4">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleNavigate(product._id)}
                >
                  Update
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OneProduct;
