import React, { useState } from 'react';
import { assets, facilityIcons } from '../assets/assets';
import { roomsDummyData } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import StarRating from '../components/StarRating';

const CheckBox = ({ label }) => {
  const [checked, setChecked] = useState(false);
  return (
    <label className="flex items-center gap-2 text-sm text-gray-700 mb-2 cursor-pointer">
      <input
        type="checkbox"
        className="accent-indigo-600"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      {label}
    </label>
  );
};

const RadioButton = ({ label }) => {
  const [selected, setSelected] = useState(false);
  return (
    <label className="flex items-center gap-2 text-sm text-gray-700 mb-2 cursor-pointer">
      <input
        type="radio"
        name="sortOption"
        className="accent-indigo-600"
        checked={selected}
        onChange={() => setSelected(true)}
      />
      {label}
    </label>
  );
};

const AllRooms = () => {
  const navigate = useNavigate();
  const [openFilters, setOpenFilter] = useState(false);

  const roomtype = ['Deluxe', 'Standard', 'Suite', 'Family'];
  const priceRanges = ['0 - 100', '100 - 200', '200 - 300', '300+'];
  const sortOptions = ['Price: Low to High', 'Price: High to Low', 'Rating'];

  return (
    <div className="pt-28 px-4 sm:px-6 md:px-16 lg:px-20 xl:px-24 pb-24">
      <div className="mb-10">
        <h1 className="font-playfair text-3xl sm:text-4xl md:text-[40px] font-semibold text-gray-800">
          Hotel Rooms
        </h1>
        <p className="text-sm md:text-base text-gray-500 mt-2 max-w-2xl">
          Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row-reverse gap-10">
        {/* Right-side Filters */}
        <div className="bg-white w-full lg:w-80 border border-gray-300 text-gray-600 rounded-md shadow-sm max-h-fit">
          <div className="flex items-center justify-between px-5 py-2.5 border-b border-gray-300">
            <p className="text-base font-medium text-gray-800">FILTERS</p>
            <div className="text-xs cursor-pointer">
              <span
                onClick={() => setOpenFilter(!openFilters)}
                className="lg:hidden"
              >
                {openFilters ? 'HIDE' : 'SHOW'}
              </span>
              <span className="hidden lg:block">CLEAR</span>
            </div>
          </div>

          <div className={`px-5 pt-5 pb-7 ${openFilters ? 'block' : 'hidden'} lg:block`}>
            <div className="mb-5">
              <p className="font-medium text-gray-800 pb-2">Popular Filters</p>
              {roomtype.map((room, index) => (
                <CheckBox key={index} label={room} />
              ))}
            </div>

            <div className="mb-5">
              <p className="font-medium text-gray-800 pb-2">Price Range</p>
              {priceRanges.map((range, index) => (
                <CheckBox key={index} label={`$ ${range}`} />
              ))}
            </div>

            <div>
              <p className="font-medium text-gray-800 pb-2">Sort By</p>
              {sortOptions.map((option, index) => (
                <RadioButton key={index} label={option} />
              ))}
            </div>
          </div>
        </div>

        {/* Room Listings */}
        <div className="flex flex-col gap-12 flex-1">
          {roomsDummyData.map((room) => (
            <div key={room._id} className="w-full flex flex-col items-start">
              <div className="flex flex-col md:flex-row items-start gap-6 w-full">
                {/* Room Image */}
                <img
                  onClick={() => {
                    navigate(`/rooms/${room._id}`);
                    scrollTo(0, 0);
                  }}
                  src={room.images[0]}
                  alt="hotel-img"
                  title="View Room Details"
                  className="w-full md:w-[300px] h-[200px] object-cover rounded-lg cursor-pointer"
                />

                {/* Room Content */}
                <div className="flex flex-col justify-between w-full">
                  <p className="text-sm text-gray-500">New York</p>
                  <h2
                    className="text-xl md:text-2xl font-playfair text-gray-800 cursor-pointer mt-1"
                    onClick={() => {
                      navigate(`/rooms/${room._id}`);
                      scrollTo(0, 0);
                    }}
                  >
                    {room.hotel.name}
                  </h2>

                  <div className="flex items-center mt-2">
                    <StarRating />
                    <p className="ml-2 text-sm text-gray-600">200+ reviews</p>
                  </div>

                  <div className="flex items-center gap-2 mt-2 text-gray-500 text-sm">
                    <img
                      src={assets.locationIcon}
                      alt="location-icon"
                      className="h-4 w-4"
                    />
                    <span>{room.hotel.address}</span>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 w-full">
                    {room.amenities.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#F5F5FF]/70 shadow-sm"
                      >
                        <img
                          src={facilityIcons[item]}
                          alt={item}
                          className="w-4 h-4"
                        />
                        <p className="text-sm text-gray-700">{item}</p>
                      </div>
                    ))}
                  </div>

                  {/* Price - With Margin */}
                  <p className="text-xl font-medium text-gray-700 mt-4">
                    ${room.pricePerNight} <span className="mx-1">/</span>night
                  </p>
                </div>
              </div>

              {/* Horizontal Line */}
              <div className="mt-6 self-start w-full">
                <div className="border-b border-gray-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllRooms;
