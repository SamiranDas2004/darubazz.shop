import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="max-w-7xl h-full mx-auto p-10">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">About Darubazz</h1>
      <p className="text-lg md:text-xl text-center mt-4">
        Welcome to Darubazz, your go-to online store for a wide variety of alcohol. Whether you're looking for fine whiskey, vodka, gin, or rum, we've got it all! 
      </p>
      <p className="text-lg md:text-xl text-center mt-4">
        Our mission is simple – to provide you with the best spirits for every occasion. We aim to make your shopping experience as smooth as possible, offering easy navigation, fast delivery, and top-quality products.
      </p>
      <p className="text-lg md:text-xl text-center mt-4">
        From premium brands to local favorites, we carefully curate our selection to cater to the diverse tastes of our customers. Whether you're celebrating a special event or just enjoying a drink with friends, Darubazz is here for you.
      </p>
      <p className="text-lg md:text-xl text-center mt-4">
        Oh, and by the way, this is a fun product by  <Link className=' font-bold font-2xl ' to='https://x.com/SamiranDas2004'>Samiran Das</Link> . Don’t take it so seriously! Enjoy responsibly!
      </p>
      
    </div>
  );
}

export default About;
