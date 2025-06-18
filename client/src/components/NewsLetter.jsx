import React from 'react';
import { assets } from '../assets/assets';
import Title from './Title';

const NewsLetter = () => {
  return (
    <div className="flex flex-col items-center w-full max-w-3xl px-4 py-12 md:py-16 mx-auto my-12 bg-gray-900 text-white rounded-2xl">
      {/* Title Section */}
      <Title
        title="Feel at Home, Anywhere"
        subTitle="Join our newsletter and be the first to discover new destinations, exclusive offers, and travel inspiration."
      />

      {/* Email Input & Button */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 w-full px-2">
        <input
          type="text"
          className="bg-white/10 px-4 py-2.5 border border-white/20 rounded outline-none w-full sm:w-auto flex-1 min-w-[240px]"
          placeholder="Enter your email"
        />
        <button className="flex items-center justify-center gap-2 group bg-black px-5 sm:px-7 py-2.5 rounded active:scale-95 transition-all">
          Subscribe
          <img
            src={assets.arrowIcon}
            alt="arrow-icon"
            className="w-3.5 invert group-hover:translate-x-1 transition-all"
          />
        </button>
      </div>

      {/* Bottom Disclaimer */}
      <p className="text-gray-500 mt-6 text-xs text-center px-4">
        By subscribing, you agree to our Privacy Policy and consent to receive updates.
      </p>
    </div>
  );
};

export default NewsLetter;
