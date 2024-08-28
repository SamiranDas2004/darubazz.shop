// import { Fragment, useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import {
//   Disclosure,
//   Menu,
//   Transition,
// } from '@headlessui/react';
// import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
// import axios from 'axios';
// import {jwtDecode} from 'jwt-decode';
// import { Button } from '@mui/material';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// const navigation = [
//   { name: 'Home', href: '/', current: true },
//   { name: 'Products', href: '/product', current: false },

// ];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ');
// }

// export default function Navbar() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();

//   const [cart,setCart]=useState()

//   useEffect(()=>{

//     const totalCartItems = async () => {
//       const token = localStorage.getItem('token');
    
//       if (!token) {
//         console.log('not logged in');
//         return;
//       }
    
//       const decodedToken = jwtDecode(token);
//       const userId = decodedToken.userId;
    
//       if (!userId) {
//         console.log('userId not found');
//         return;
//       }
    
//       console.log(userId);
    
//       try {
//         const response = await axios.post("http://localhost:8000/api/product/cartitems", { userId });
//         setCart(response.data.totalItems); // Assuming setCart is a state setter function from useState
//         console.log(response.data);
//       } catch (error) {
//         console.error('Error:', error.message);
//       }
//     };
//     totalCartItems()
//   },[cart])



//   const userId = async () => {
//     const token = localStorage.getItem('token');

//     if (!token) {
//       console.log('not logged in');
//       return;
//     }

//     const decodedToken = jwtDecode(token);
//     const userId = decodedToken.userId;
//     if (!userId) {
//       console.log('userId not found');
//       return;
//     }

//     navigate(`/cart/${userId}`);
//   };

//   useEffect(() => {
//     axios.get('/api/user/status', { withCredentials: true })
//       .then(response => {
//         if (response.status === 200) {
//           setIsLoggedIn(true);
//         }
//       })
//       .catch(() => {
//         setIsLoggedIn(false);
//       });
//   }, []);

//   const handleLogout = () => {
//     axios.get('/api/user/logout', { withCredentials: true })
//       .then(response => {
//         if (response.status === 200) {
//           localStorage.removeItem('token');
//           setIsLoggedIn(false);
//         }
//       })
//       .catch(error => {
//         console.error('Logout failed', error);
//       });
//   };

//   return (
//     <Disclosure as="nav" className="bg-gray-200 sticky top-0 z-50 shadow-lg">
//       {({ open }) => (
//         <>
//           <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
//             <div className="relative flex h-16 items-center justify-between">
//               <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
//                 {/* Mobile menu button */}
//                 <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
//                   <span className="sr-only">Open main menu</span>
//                   {open ? (
//                     <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
//                   ) : (
//                     <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
//                   )}
//                 </Disclosure.Button>
//               </div>
//               <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
//                 <div className="flex flex-shrink-0 items-center">
//                   <img
//                     className="h-8 w-auto"
//                     src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
//                     alt="Your Company"
//                   />
//                 </div>
//                 <div className="hidden sm:ml-6 sm:block">
//                   <div className="flex space-x-4">
//                     {navigation.map((item) => (
//                       <Link
//                         key={item.name}
//                         to={item.href}
//                         className={classNames(
//                           item.current ? 'h-6 w-1 text-black font-serif font-bold' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
//                           'rounded-md px-3 py-2 text-sm font-medium'
//                         )}
//                         aria-current={item.current ? 'page' : undefined}
//                       >
//                         {item.name}
//                       </Link>
//                     ))}
                   
//                     <Button
                  
//                     >
//                        <Link
//                                 to="/user/seller"
//                                className="h-6 w-6 text-black font-serif font-bold"
//                               >
//                                 Seller
//                               </Link>
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//               <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
//                 <button
//                   type="button"
//                   className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
//                 >
//                   <span className="sr-only">View notifications</span>
              
//                   <Button
//                       onClick={userId}
//                       className="ml-4 text-white"
//                     >
// <ShoppingCartIcon className="h-6 w-6 text-white" /> <p>{cart}</p>
//                     </Button>
//                 </button>

//                 {/* Profile dropdown */}
//                 <Menu as="div" className="relative ml-3">
//                   <div>
//                     <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
//                       <span className="sr-only">Open user menu</span>
//                       <img
//                         className="h-8 w-8 rounded-full"
//                         src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//                         alt=""
//                       />
//                     </Menu.Button>
//                   </div>
//                   <Transition
//                     as={Fragment}
//                     enter="transition ease-out duration-100"
//                     enterFrom="transform opacity-0 scale-95"
//                     enterTo="transform opacity-100 scale-100"
//                     leave="transition ease-in duration-75"
//                     leaveFrom="transform opacity-100 scale-100"
//                     leaveTo="transform opacity-0 scale-95"
//                   >
//                     <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                       {!isLoggedIn ? (
//                         <>
//                           <Menu.Item>
//                             {({ active }) => (
//                               <Link
//                                 to="/user/signup"
//                                 className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
//                               >
//                                 Sign Up
//                               </Link>
//                             )}
//                           </Menu.Item>
//                           <Menu.Item>
//                             {({ active }) => (
//                               <Link
//                                 to="/user/login"
//                                 className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
//                               >
//                                 Login
//                               </Link>
//                             )}
//                           </Menu.Item>
//                           {/* <Menu.Item>
//                             {({ active }) => (
//                               <Link
//                                 to="/user/seller"
//                                 className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
//                               >
//                                 Seller
//                               </Link>
//                             )}
//                           </Menu.Item> */}
//                         </>
//                       ) : (
//                         <Menu.Item>
//                           {({ active }) => (
//                             <a
//                               href="#"
//                               onClick={handleLogout}
//                               className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
//                             >
//                               Logout
//                             </a>
//                           )}
//                         </Menu.Item>
//                       )}
//                     </Menu.Items>
//                   </Transition>
//                 </Menu>
//               </div>
//             </div>
//           </div>

//           <Disclosure.Panel className="sm:hidden">
//             <div className="space-y-1 px-2 pb-3 pt-2">
//               {navigation.map((item) => (
//                 <Disclosure.Button
//                   key={item.name}
//                   as="a"
//                   href={item.href}
//                   className={classNames(
//                     item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
//                     'block rounded-md px-3 py-2 text-base font-medium'
//                   )}
//                   aria-current={item.current ? 'page' : undefined}
//                 >
//                   {item.name}
//                 </Disclosure.Button>
//               ))}
//             </div>
//           </Disclosure.Panel>
//         </>
//       )}
//     </Disclosure>
//   );
// }


import React from 'react';

function Navbar() {
  return (
    <header className="bg-white sticky top-0 ">
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between">
        <div className="md:flex md:items-center md:gap-12">
          <a className="block text-teal-600" href="#">
            <span className="sr-only">Home</span>
            <svg className="h-8" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>
  
        <div className="hidden md:block">
          <nav aria-label="Global">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> About </a>
              </li>
  
              <li>
                <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Careers </a>
              </li>
  
              <li>
                <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> History </a>
              </li>
  
              <li>
                <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Services </a>
              </li>
  
              <li>
                <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Projects </a>
              </li>
  
              <li>
                <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Blog </a>
              </li>
            </ul>
          </nav>
        </div>
  
        <div className="flex items-center gap-4">
          <div className="sm:flex sm:gap-4">
            <a
              className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
              href="#"
            >
              Login
            </a>
  
            <div className="hidden sm:flex">
              <a
                className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
                href="#"
              >
                Register
              </a>
            </div>
          </div>
  
          <div className="block md:hidden">
            <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
  );
}

export default Navbar;
