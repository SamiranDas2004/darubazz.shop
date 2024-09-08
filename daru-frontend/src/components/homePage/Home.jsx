import React from 'react';
import "react-alice-carousel/lib/alice-carousel.css";

import { useNavigate } from 'react-router-dom';

function Home() {

    const callouts = [
        {
          id: 1,
          name: 'Beer',
          description: 'Work from home accessories',
          imageSrc: 'https://storage.gotoliquorstore.com/category/7cf6f894-abad-46aa-bc8c-2c494faa6daf.jpg',
          imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
          href: '/beer', 
        },
        {
          id: 2,
          name: 'Wine',
          description: 'Journals and note-taking',
          imageSrc: 'https://storage.gotoliquorstore.com/category/e4aaf743-e9fc-4178-ba05-41a4ee85127b.jpg',
          imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
          href: '/wine', 
        },
        {
          id: 3,
          name: 'Vodka',
          description: 'Daily commute essentials',
          imageSrc: 'https://storage.gotoliquorstore.com/category/4206befa-27ba-4b61-869d-403d931d4838.jpg',
          imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
          href: '/vodka', 
        },
        {
          id: 4,
          name: 'Rum',
          description: 'Daily commute essentials',
          imageSrc: 'https://storage.gotoliquorstore.com/category/a843a16b-9a7d-49f4-a066-311beff22dc0.jpg',
          imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
          href: '/rum', 
        },
        {
          id: 5,
          name: 'Whiskey',
          description: 'Daily commute essentials',
          imageSrc: 'https://storage.gotoliquorstore.com/category/e4279320-0fc1-4293-b036-d4e4db26dbca.jpg',
          imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
          href: '/whiskey', 
        },
        {
          id: 6,
          name: 'Gin',
          description: 'Daily commute essentials',
          imageSrc: 'https://storage.gotoliquorstore.com/category/39209231-8aac-46ea-9119-9c7aedf427ee.jpg',
          imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
          href: '/gin', 
        },
      ];
    const navigate = useNavigate();

    const handleNavigate = (path) => {
      navigate(path);
    };
  

    const handleNavigat = () => {
        navigate('/product');
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
                <div className="flex flex-col mt-20 items-center p-10 bg bg-white">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center md:text-left">Welcome to Darubazz</h1>

                    <p className="mt-12 text-lg md:text-2xl text-center">
                        Enjoy the special moments of your life with friends and a glass of Daru.
                        Experience the spirit of true friendship.
                    </p>
                    <button
                        onClick={handleNavigat}
                        className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-lg text-lg md:text-2xl mt-12"
                        style={{ backgroundColor: '#85004b' }}
                    >
                        Shop Now
                    </button>
                </div>
                <div className="relative">
                  <img src=' https://content.gotoliquorstore.com/images/Pickup-Delivery1.jpg' alt=' daruu'/>
                </div>
            </div>
            <div>
              

            <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-4xl font-bold justify-center flex text-gray-900">Category</h2>

          <div className="mt-6 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {callouts.map((callout) => (
    <div
      key={callout.id}
      className="group relative cursor-pointer"
      onClick={() => handleNavigate(callout.href)}
    >
      <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden rounded-lg bg-white">
        <img
          src={callout.imageSrc}
          alt={callout.imageAlt}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <h3 className="mt-6  text-gray-500 font-bold text-2xl font-serif text-center">{callout.name}</h3>
      
    </div>
  ))}
 
</div>

        </div>
      </div>
    </div>
  
            </div>


        </>
    );
}

export default Home;
