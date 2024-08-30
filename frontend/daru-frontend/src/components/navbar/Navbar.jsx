import { Fragment, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Products', href: '/product', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [cart, setCart] = useState(0); // Initialize cart to 0

  useEffect(() => {
    const totalCartItems = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('not logged in');
        return;
      }
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      if (!userId) {
        console.log('userId not found');
        return;
      }
      try {
        const response = await axios.post("http://localhost:8000/api/product/cartitems", { userId });
        setCart(response.data.totalItems || 0); // Default to 0 if totalItems is undefined
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
    totalCartItems();
  }, []);

  const handleUserIdClick = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('not logged in');
      return;
    }
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;
    if (!userId) {
      console.log('userId not found');
      return;
    }
    navigate(`/cart/${userId}`);
  };

  useEffect(() => {
    axios.get('/api/user/status', { withCredentials: true })
      .then(response => {
        if (response.status === 200) {
          setIsLoggedIn(true);
        }
      })
      .catch(() => {
        setIsLoggedIn(false);
      });
  }, []);

  const handleLogout = () => {
    axios.get('/api/user/logout', { withCredentials: true })
      .then(response => {
        if (response.status === 200) {
          localStorage.removeItem('token');
          setIsLoggedIn(false);
        }
      })
      .catch(error => {
        console.error('Logout failed', error);
      });
  };

  return (
    <Disclosure as="nav" className="bg-gray-200 sticky top-0 z-50 shadow-lg">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-between sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://www.shutterstock.com/image-vector/glass-cocktail-large-size-icon-600nw-2257192953.jpg"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:flex sm:space-x-4">
                  <Link to="/" className="text-black font-serif font-bold text-sm sm:text-base px-2 py-1 sm:px-4 sm:py-2">
                    Home
                  </Link>
                  <Link to="/product" className="text-black font-serif font-bold text-sm sm:text-base px-2 py-1 sm:px-4 sm:py-2">
                    Products
                  </Link>
                  <Link to="/user/seller" className="text-black font-serif font-bold text-sm sm:text-base px-2 py-1 sm:px-4 sm:py-2">
                    Seller
                  </Link>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Button
                  onClick={handleUserIdClick}
                  className="relative flex items-center text-white text-sm sm:text-base px-2 py-1 sm:px-4 sm:py-2"
                >
                  <ShoppingCartIcon className="h-6 w-6 text-black" />
                  {cart > 0 && (
                    <span className="absolute -top-1 -right-1 text-xs font-bold text-white bg-red-500 rounded-full px-2 py-1">
                      {cart}
                    </span>
                  )}
                </Button>

                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                     <AccountCircleOutlinedIcon className='h-8 w-8 rounded-full color-white'/>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {!isLoggedIn ? (
                        <>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/user/signup"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              >
                                Sign Up
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/user/login"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              >
                                Login
                              </Link>
                            )}
                          </Menu.Item>
                        </>
                      ) : (
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              onClick={handleLogout}
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Logout
                            </a>
                          )}
                        </Menu.Item>
                      )}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
