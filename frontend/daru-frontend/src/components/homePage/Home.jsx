import React from 'react';
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from 'react-alice-carousel';
import Category from '../Category/Category';
import Overview from '../Overview/Overview';
import { HomeData } from '../../../data/HomeCarauselData';
import { useNavigate } from 'react-router-dom';

function Home() {
    const items = HomeData.map((i) => (
        <img className="w-full h-full object-cover" src={i.image} alt="carousel item" />
    ));

    const navigate=useNavigate()
    const handelNavigate=()=>{
      navigate('/product')
    }
    return (
        <>
            <div className="grid grid-cols-2 h-3/4">
                <div className="flex flex-col mt-20 items-center p-10 bg-gray-100">
                    <h1 className="text-6xl font-bold mb-4">Welcome to Darubazz</h1>
                    <p className="mt-12 text-2xl text-center">
                        Enjoy the special moments of your life with friends and a glass of Daru.
                        Experience the spirit of true friendship.
                    </p>
                    <button
                    onClick={handelNavigate}
                        className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-lg text-2xl mt-12"
                        style={{ backgroundColor: '#85004b' }}
                    >
                        Shop Now
                    </button>
                </div>
                <div className="relative">
                    <AliceCarousel
                        mouseTracking
                        disableButtonsControls
                        items={items}
                        infinite
                        controlsStrategy="alternate"
                        className="absolute inset-0"
                    />
                </div>
            </div>
            <div>
                <Category />
                <Overview />
            </div>
        </>
    );
}

export default Home;
