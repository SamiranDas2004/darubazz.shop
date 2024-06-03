import React from 'react'

import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from 'react-alice-carousel';
import Category from '../Category/Category';
import Overview from '../Overview/Overview';
import { HomeData } from '../../../data/HomeCarauselData';
function Home() {

    const items=HomeData.map((i)=><img class="flex justify-center w-full  items-center h-screen" width="" src={i.image}/>)
  return (
    <>
    <div
    >
             <AliceCarousel
        mouseTracking
        disableButtonsControls
        items={items}
        autoPlay
        autoPlayInterval={2000}
        infinite
        controlsStrategy="alternate"
    />

    </div>
    <div>
    <Category/>
    <Overview/>
    </div>
    </>
  )
  
}

export default Home