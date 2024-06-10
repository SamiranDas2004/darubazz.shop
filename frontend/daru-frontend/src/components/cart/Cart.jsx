import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Fragment } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { jwtDecode } from "jwt-decode"


export default function Cart() {
  const [open, setOpen] = useState(true);
  const { userId } = useParams();
  const [cartItems, setCartItems] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [image, setImage] = useState();




  const totalPrice = cartItems.reduce((total, cartItem) => {
    const itemTotal = cartItem.products.reduce((subTotal, product) => subTotal + product.price, 0);
    return total + itemTotal;
  }, 0);



  const handlePlaceOrder = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.log("not logged in");
    }
  
    const decodedToken=jwtDecode(token)
   const userId=decodedToken.userId;
   if (!userId) {
    console.log("userId not found");
    return
   }
    

    try {
      const orderPromises = cartItems.flatMap(cartItem =>
        cartItem.products.map(async product => {
          const response = await axios.post(`http://localhost:8000/api/order/placeorder/${product._id}`, { userId });
          console.log(response.data);
          return response;
        })
      );

      const responses = await Promise.all(orderPromises);

      if (responses.every(response => response.status === 201)) {
        setMessage('Order placed successfully');
        navigate(`/order/address/${totalPrice}`); // Redirect to order confirmation page
      } else {
        setMessage('Failed to place order for some items');
      }
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || error.message}`);
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/user/cartitems/${userId}`);
        if (response.status === 200) {
          setCartItems(response.data);
        } else {
          setMessage("Can't get the cart items");
        }
      } catch (error) {
        setMessage(`Error: ${error.response?.data?.message || error.message}`);
      }
    };

    fetchCartItems();
  }, [userId]);

  const removeFromCart = async (productId) => {
    try {
      const response = await axios.delete('http://localhost:8000/api/user/deletecart', {
        data: { productId },
      });
      if (response.status === 200) {
        setMessage('Product removed from cart');
        setCartItems((prevItems) =>
          prevItems
            .map((item) => ({
              ...item,
              products: item.products.filter((product) => product._id !== productId),
            }))
            .filter((item) => item.products.length > 0)
        );
      } else {
        setMessage('Failed to remove from cart');
      }
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || error.message}`);
      console.log(error);
    }
  };


  const imageChange = (id) => {
    setImage(id);
  };

  return (
    <Transition show={open}>
      <Dialog className="relative z-10" onClose={setOpen}>
        <TransitionChild
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8 ">
            <div className="aspect-h- aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
              <div className="max-w-lg w-full bg-white rounded-lg h-full shadow-lg p-4 overflow-hidden">
                <img src={image} alt="Selected product" className="object-cover object-center" />
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{message}</p>
                </div>
              </div>
            </div>
          </div>
        </TransitionChild>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <TransitionChild
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <DialogTitle className="text-lg font-medium text-gray-900">Shopping cart</DialogTitle>
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
                            {cartItems.map((cartItem) => (
                              <div key={cartItem._id} className="">
                                {cartItem.products.map((product) => (
                                  <div
                                    onClick={() => imageChange(product.imageUrl)}
                                    key={product._id}
                                  >
                                    <img src={product.imageUrl} alt={product.productname} className="" />
                                    <h3 className="">{product.productname}</h3>
                                    <p>
                                      <strong>Brand:</strong> {product.brand}
                                    </p>
                                    <p>
                                      <strong>Price:</strong> {product.price}
                                    </p>
                                    <p>
                                      <strong>Category:</strong> {product.category}
                                    </p>
                                    <button onClick={() => removeFromCart(product._id)}>Remove</button>
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
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
