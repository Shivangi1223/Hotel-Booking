import React from 'react'

const AllRooms = () => {
  return (
    <div className='flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32'>
      <h1>All Rooms</h1>

      <div className='flex flex-col items-start text-left'>
       <h1 className='font-playfair text-4xl md:text-[40px]'>Hotel Rooms</h1>
       <p className='text-sm md:text-base text-gray-500/90 mt-2 mx-w-174'>Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.</p>
      </div>
      {/* Filters */}
      <div>

      </div>
    </div>
  )
}

export default AllRooms
