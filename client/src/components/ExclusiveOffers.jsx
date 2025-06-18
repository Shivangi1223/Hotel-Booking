import React from 'react';
import Title from './Title';
import { assets, exclusiveOffers } from '../assets/assets';

const ExclusiveOffers = () => {
  return (
    <div className='flex flex-col px-6 md:px-16 lg:px-24 xl:px-32 pt-20 pb-32'>

      {/* Title and Button */}
      <div className='flex flex-col md:flex-row items-start justify-between w-full'>
      

        <Title
        align='left'
        title='Exclusive Offers'
        subTitle={
        <p className='text-sm text-gray-400 font-normal leading-relaxed text-left max-w-2xl'>
        Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.
        </p>
        }
        />



        <button className='group flex items-center gap-2 font-medium cursor-pointer md:mt-10'>
          View All Offers
          <img
            src={assets.arrowIcon}
            alt='arrow-icon'
            className='group-hover:translate-x-1 transition-all w-4 h-4'
          />
        </button>
      </div>

      {/* Offer Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 w-full'>
        {exclusiveOffers.map((item) => (
          <div
            key={item._id}
            className='relative rounded-xl overflow-hidden min-h-[300px] text-white bg-cover bg-center shadow-lg transition-transform hover:scale-[1.01]'
            style={{ backgroundImage: `url(${item.image})` }}
          >
            {/* Overlay */}
            <div className='absolute inset-0 bg-black/40 z-0'></div>

            {/* Card Content */}
            <div className='relative z-10 p-6 flex flex-col h-full justify-between'>

              {/* Badge */}
              <p className='px-3 py-1 text-xs bg-white text-gray-800 font-semibold rounded-full w-fit'>
                {item.priceOff}% OFF
              </p>

              {/* Bottom Details */}
              <div className='mt-auto'>
                <p className='text-2xl font-playfair font-semibold mb-1'>{item.title}</p>
                <p className='text-sm leading-snug'>{item.description}</p>
                <p className='text-xs text-white/70 mt-3'>Expires {item.expiryDate}</p>

                <button className='flex items-center gap-2 font-medium cursor-pointer mt-4 group'>
                  View Offers
                  <img
                    className='invert group-hover:translate-x-1 transition-transform w-4 h-4'
                    src={assets.arrowIcon}
                    alt='arrow-icon'
                  />
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ExclusiveOffers;
