import React from 'react';
import me from './me.jpg';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { CiMail } from 'react-icons/ci';

function Developer() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-10">
      <img
        src={me}
        alt="Developer"
        className="w-40 h-40 rounded-full mb-6"
      />
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-purple-700">Developer</h1>
      <p className="text-lg md:text-2xl text-center text-gray-700">
        This product was designed and developed by an enthusiastic coder. It’s all about creating something fun and unique.
      </p>
      <p className="mt-6 text-lg md:text-xl text-gray-600 text-center">
        Don’t take it too seriously – it’s just for fun! Enjoy the journey of building cool things!
      </p>
      <p className="mt-12 text-md font-semibold text-gray-500">
        Powered by curiosity and endless cups of Daru 🥃
      </p>
      <div className="flex space-x-6 mt-8">
        <a href="https://github.com/SamiranDas2004" target="_blank" rel="noopener noreferrer">
          <FaGithub size={24} className="text-gray-700 hover:text-gray-500" />
        </a>
        <a href="https://www.linkedin.com/in/samiran-das-dev/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={24} className="text-blue-700 hover:text-blue-500" />
        </a>
        <a href="mailto:samiran4209@gmail.com" target="_blank" rel="noopener noreferrer">
          <CiMail size={24} className="text-red-600 hover:text-red-400" />
        </a>
      </div>
    </div>
  );
}

export default Developer;
