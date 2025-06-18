import React from 'react'
import { assets } from '../assets/assets'
import { roomsDummyData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import StarRating from '../components/StarRating'

const AllRooms = () => {
  const navigate = useNavigate()

  return (
    <div className='pt-28 px-4 sm:px-6 md:px-16 lg:px-20 xl:px-24 pb-24'>
      {/* Heading */}
      <div className='mb-10'>
        <h1 className='font-playfair text-3xl sm:text-4xl md:text-[40px] font-semibold text-gray-800'>
          Hotel Rooms
        </h1>
        <p className='text-sm md:text-base text-gray-500 mt-2 max-w-2xl'>
          Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.
        </p>
      </div>

      {/* Room Cards - Vertically stacked & left aligned */}
      <div className='flex flex-col gap-10 items-start'>
        {roomsDummyData.map((room) => (
          <div
            key={room._id}
            className='bg-white p-4 rounded-xl shadow hover:shadow-md transition-all duration-300 w-full max-w-md'
          >
            {/* Image */}
            <img
              onClick={() => {
                navigate(`/rooms/${room._id}`)
                scrollTo(0, 0)
              }}
              src={room.images[0]}
              alt='hotel-img'
              title='View Room Details'
              className='w-full h-[200px] sm:h-[250px] object-cover rounded-lg cursor-pointer mb-4'
            />

            {/* City & Hotel Name */}
            <p className='text-gray-500 text-sm'>{room.hotel.city}</p>
            <p className='text-gray-800 text-2xl font-playfair cursor-pointer'>
              {room.hotel.name}
            </p>

            {/* Ratings */}
            <div className='flex items-center mt-1'>
              <StarRating />
              <p className='ml-2 text-sm text-gray-600'>200+ reviews</p>
            </div>

            {/* Location */}
            <div className='flex items-center gap-1 text-gray-500 mt-2 text-sm'>
              <img
                src={assets.locationIcon}
                alt='location-icon'
                className='h-4 w-4'
              />
              <span>{room.hotel.address}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllRooms
