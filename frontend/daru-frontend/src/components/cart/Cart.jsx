import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {jwtDecode} from 'jwt-decode';
import {useDispatch} from 'react-redux'
import { addProducts } from '../features/products/product.Slice';


const Cart = () => {
  const { userId } = useParams();
  const [open, setOpen] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [message, setMessage] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const dispatch=useDispatch()



  // Function to fetch cart items from backend
  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/user/cartitems/${userId}`);
      if (response.status === 200) {
        setCartItems(response.data);
        calculateTotalPrice(response.data); // Calculate total price when cart items are fetched
      } else {
        setMessage("Can't get the cart items");
      }
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

//reduc-toolkit
  const addTodoHandeler=(e)=>{
    e.preventDefault()
    dispatch(addProducts())
  }

  // Function to calculate total price
  const calculateTotalPrice = (cartItems) => {
    let totalPrice = 0;
    cartItems.forEach(cartItem => {
      cartItem.products.forEach(product => {
        totalPrice += product.price;
      });
    });
    setTotalPrice(totalPrice);
  };

  // Function to remove a product from cart
  const removeFromCart = async (productId) => {
    try {
      const response = await axios.post(`http://localhost:8000/api/user/deletecart/${productId}`, { userId });
      if (response.status === 200) {
        setMessage('Product removed from cart');
        // Update cart items after removing product
        const updatedCartItems = cartItems.map(cartItem => ({
          ...cartItem,
          products: cartItem.products.filter(product => product._id !== productId)
        })).filter(cartItem => cartItem.products.length > 0);
        setCartItems(updatedCartItems);
        calculateTotalPrice(updatedCartItems); // Recalculate total price after updating cart items
      } else {
        setMessage('Failed to remove from cart');
      }
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  // Function to handle placing order
  const handlePlaceOrder = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('Not logged in');
      return;
    }

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;
    const username = decodedToken.username;
    const email = decodedToken.email;
    console.log(username,email);
    if (!userId) {
      console.log('User ID not found');
      return;
    }

    try {
      const orderPromises = cartItems.flatMap(cartItem =>
        cartItem.products.map(async product => {
          const response = await axios.post(`http://localhost:8000/api/order/placeorder/${product._id}`, { userId ,username,email});
          console.log(response.data);
          return response;
        })
      );

      const responses = await Promise.all(orderPromises);

      if (responses.every(response => response.status === 201)) {
        setMessage('Order placed successfully');
        navigate(`/order/address/${totalPrice}`);
      } else {
        setMessage('Failed to place order for some items');
      }
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || error.message}`);
      console.log(error);
    }
  };

  // Fetch cart items on component mount
  useEffect(() => {
    fetchCartItems();
  }, []);

  // Function to handle image change
  const imageChange = (imageUrl) => {
    setImage(imageUrl);
  };

  return (
    <Transition show={open}>
      <Dialog className="relative z-10" onClose={() => setOpen(false)}>
        <Transition.Child
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 " />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">Shopping Cart</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-red-400 hover:text-red-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {cartItems.map(cartItem => (
                              <div key={cartItem._id}>
                                {cartItem.products.map(product => (
                                  <div key={product._id} className="py-6 flex">
                                    <div className="flex-shrink-0">
                                      <img
                                        src={product.imageUrl}
                                        alt={product.productname}
                                     className="h-24 w-24 object-cover object-center cursor-pointer shadow-md"
                                        onClick={() => imageChange(product.imageUrl)}
                                      />
                                    </div>

                                    <div className="ml-4 flex-1 flex flex-col">
                                      <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                          <h3>{product.productname}</h3>
                                          <p className="ml-4">Rs {product.price}</p>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
                                      </div>
                                      <div className="flex-1 flex items-end justify-between text-sm">
                                        <p className="text-gray-500">{product.category}</p>
                                        <button
                                          onClick={() => removeFromCart(product._id)}
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>{totalPrice}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6">
                        <button
                          onClick={handlePlaceOrder}
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Continue
                        </button>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{' '}
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                      {message && <div className="mt-4 text-center text-red-500">{message}</div>}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>

      {image && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-4 overflow-hidden">
            <img src={image} alt="Selected product" className="object-cover object-center w-full h-auto" />
            <div className="absolute top-2 right-2">
              <button
                className="text-red-500 hover:text-red-600"
                onClick={() => setImage('')}
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </Transition>
  );
};

export default Cart;
