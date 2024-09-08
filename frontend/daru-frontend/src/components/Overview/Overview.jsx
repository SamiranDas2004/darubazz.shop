import React from 'react'

function Overview() {
  return (
    <div className="flex flex-col bottom-0 border-t-2">
      <div className="flex-grow">
        {/* Your main content can go here */}
      </div>
      <footer className="bg-white rounded-lg shadow mt-auto bottom-0 m-4 mb-0 dark:bg-gray-800">
        <div className="w-full p-6 md:flex md:items-center md:justify-between">
          <span className="text-lg text-gray-500 sm:text-center dark:text-gray-400">
            © 2024
            <a
              href="https://flowbite.com/"
              className="hover:underline font-semibold"
            >
              Darubazz™
            </a>
            . All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center justify-center mt-6 md:mt-0 text-md font-medium text-gray-500 dark:text-gray-400">
            <li className="mr-6">
              <a href="/about" className="hover:underline">
                About
              </a>
            </li>
            <li className="mr-6">
              <a href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li className="mr-6">
              <a href="/developer" className="hover:underline">
                Developers
              </a>
            </li>
            
            
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default Overview;
