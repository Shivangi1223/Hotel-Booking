import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { assets, facilityIcons, roomCommonData } from '../assets/assets';
import StarRating from '../components/StarRating';
import toast from 'react-hot-toast';

import roomImg1 from '../assets/roomImg1.png';
import roomImg2 from '../assets/roomImg2.png';
import roomImg3 from '../assets/roomImg3.png';
import roomImg4 from '../assets/roomImg4.png';



const dummyRooms = [
  {
    _id: '1',
    pricePerNight: 199,
    images: [roomImg1, roomImg2, roomImg3, roomImg4],
    hotel: { name: 'Urbanza Suites', address: 'Main Road 123, Las Vegas' },
    roomType: 'Luxury Suite',
    amenities: ['Free WiFi', 'Room Service', 'Pool Access'],
  },
  {
    _id: '2',
    pricePerNight: 249,
    images: [roomImg2, roomImg3, roomImg4, roomImg1],
    hotel: { name: 'Urbanza Suites', address: 'Main Road 123, Las Vegas' },
    roomType: 'Sea View Room',
    amenities: ['Free WiFi', 'Pool Access', 'Free Breakfast'],
  },
  {
    _id: '3',
    pricePerNight: 299,
    images: [roomImg3, roomImg4, roomImg1, roomImg2],
    hotel: { name: 'Urbanza Suites', address: 'Main Road 123, Las Vegas' },
    roomType: 'Mountain View Deluxe',
    amenities: ['Free WiFi', 'Mountain View', 'Room Service'],
  },
  {
    _id: '4',
    pricePerNight: 399,
    images: [roomImg4, roomImg1, roomImg2, roomImg3],
    hotel: { name: 'Urbanza Suites', address: 'Main Road 123, Las Vegas' },
    roomType: 'Heritage Royal',
    amenities: ['Free Breakfast', 'Room Service', 'Pool Access'],
  },
];


// const dummyRooms = [
//   {
//     _id: '64b0c6c1e9a48d6efcd11111',
//     pricePerNight: 199,
//     images: [roomImg1, roomImg2, roomImg3, roomImg4],
//     hotel: { name: 'Urbanza Suites', address: 'Main Road 123, Las Vegas' },
//     roomType: 'Luxury Suite',
//     amenities: ['Free WiFi', 'Room Service', 'Pool Access'],
//   },
//   {
//     _id: '64b0c6c1e9a48d6efcd22222',
//     pricePerNight: 249,
//     images: [roomImg2, roomImg3, roomImg4, roomImg1],
//     hotel: { name: 'Urbanza Suites', address: 'Main Road 123, Las Vegas' },
//     roomType: 'Sea View Room',
//     amenities: ['Free WiFi', 'Pool Access', 'Free Breakfast'],
//   },
//   {
//     _id: '64b0c6c1e9a48d6efcd33333',
//     pricePerNight: 299,
//     images: [roomImg3, roomImg4, roomImg1, roomImg2],
//     hotel: { name: 'Urbanza Suites', address: 'Main Road 123, Las Vegas' },
//     roomType: 'Mountain View Deluxe',
//     amenities: ['Free WiFi', 'Mountain View', 'Room Service'],
//   },
//   {
//     _id: '64b0c6c1e9a48d6efcd44444',
//     pricePerNight: 399,
//     images: [roomImg4, roomImg1, roomImg2, roomImg3],
//     hotel: { name: 'Urbanza Suites', address: 'Main Road 123, Las Vegas' },
//     roomType: 'Heritage Royal',
//     amenities: ['Free Breakfast', 'Room Service', 'Pool Access'],
//   },
// ];


const RoomDetails = () => {
  const { id } = useParams();
  const { rooms, getToken, axios, navigate } = useAppContext();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [isAvailable, setIsAvailable] = useState(false);

  const checkAvailability = async () => {
    try {
      if (checkInDate >= checkOutDate) {
        toast.error('Check-In-Date should be less than Check-Out-Date');
        return;
      }
      const { data } = await axios.post('/api/bookings/check-availability', {
        room: id,
        checkInDate,
        checkOutDate,
      });
      if (data.success) {
        setIsAvailable(data.isAvailable);
        toast[data.isAvailable ? 'success' : 'error'](
          data.isAvailable ? 'Room is Available' : 'Room is not available'
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmithandler = async (e) => {
    e.preventDefault();
    if (!isAvailable) {
      return checkAvailability();
    } else {
      try {
        const token = await getToken();
        const { data } = await axios.post(
          '/api/bookings/book',
          {
            room: room._id, // ✅ FIX: Correct room id
            checkInDate,
            checkOutDate,
            guests,
            paymentMethod: 'Pay At Hotel',
            email: localStorage.getItem('userEmail') || "", // ✅ Optional if backend expects email
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // if (data.success) {
        //   toast.success(data.message);
        //   navigate('/my-bookings');
        //   scrollTo(0, 0);
        // } else {
        //   toast.error(data.message);
        // }
        if (data.success) {
  toast.success(data.message);
  setTimeout(() => {
    navigate('/my-bookings');
    scrollTo(0, 0);
  }, 500); // ✅ Added delay for Clerk user context
} else {
  toast.error(data.message);
}

      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    let foundRoom = rooms.find((room) => room._id === id);
    if (!foundRoom) {
      foundRoom = dummyRooms.find((room) => room._id === id);
    }
    if (foundRoom) {
      setRoom(foundRoom);
      setMainImage(foundRoom.images[0]);
    }
  }, [rooms, id]);

  if (!room) return <div className='text-center py-20'>Loading Room Details...</div>;

  return (
    <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>
      <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
        <h1 className='text-3xl md:text-4xl font-playfair'>
          {room.hotel?.name || 'Hotel Name'}{' '}
          <span className='font-inter text-sm'>({room.roomType})</span>
        </h1>
        <p className='text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full'>
          20% OFF
        </p>
      </div>

      <div className='flex items-center gap-1 mt-2'>
        <StarRating />
        <p className='ml-2'>200+ reviews</p>
      </div>

      <div className='flex items-center gap-1 text-gray-500 mt-2'>
        <img src={assets.locationIcon} alt='location-icon' />
        <span>{room.hotel?.address || 'Hotel Address'}</span>
      </div>

      <div className='flex fle-col lg:flex-row mt-6 gap-6'>
        <div className='lg:w-1/2 w-full'>
          <img
            src={mainImage}
            alt='Room'
            className='w-full rounded-xl shadow-lg object-cover'
          />
        </div>

        <div className='grid grid-cols-2 gap-4 lg:w-1/2 w-full'>
          {room.images.length > 1 &&
            room.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                onClick={() => setMainImage(img)}
                alt='Room'
                className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${
                  mainImage === img && 'outline-3 outline-orange-500'
                }`}
              />
            ))}
        </div>
      </div>

      <div className='flex flex-col md:flex-row md:justify-between mt-10'>
        <div className='flex flex-col'>
          <h1 className='text-3xl md:text-4xl font-playfair'>
            Experience Luxury Like Never Before
          </h1>
          <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
            {room.amenities.map((item, index) => (
              <div
                key={index}
                className='flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100'
              >
                {facilityIcons[item] && (
                  <img src={facilityIcons[item]} alt={item} className='w-5 h-5' />
                )}
                <p className='text-xs'>{item}</p>
              </div>
            ))}
          </div>
        </div>
        <p className='text-2xl font-medium'>${room.pricePerNight}/night</p>
      </div>

      <form
        onSubmit={onSubmithandler}
        className='flex fle-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl'
      >
        <div className='flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500'>
          <div className='flex flex-col'>
            <label htmlFor='checkInDate' className='font-medium'>
              Check-In
            </label>
            <input
              onChange={(e) => setCheckInDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              type='date'
              id='checkInDate'
              className='w-full rounded border boder-gray-300 px-3 py-2 mt-1.5 outline-none'
              required
            />
          </div>

          <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>

          <div className='flex flex-col'>
            <label htmlFor='checkOutDate' className='font-medium'>
              Check-Out
            </label>
            <input
              onChange={(e) => setCheckOutDate(e.target.value)}
              min={checkInDate}
              disabled={!checkInDate}
              type='date'
              id='checkOutDate'
              className='w-full rounded border boder-gray-300 px-3 py-2 mt-1.5 outline-none'
              required
            />
          </div>

          <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>

          <div className='flex flex-col'>
            <label htmlFor='guests' className='font-medium'>
              Guests
            </label>
            <input
              onChange={(e) => setGuests(e.target.value)}
              value={guests}
              type='number'
              id='guests'
              className='max-w-20 rounded border boder-gray-300 px-3 py-2 mt-1.5 outline-none'
              required
            />
          </div>
        </div>

        <button
          type='submit'
          className='bg-primary hover:bg-primary-dull active:scale-95 transition-all text-white rounded-md max-md:w-fit max-md:px-3 max-md:py-2 max-md:text-sm md:px-25 py-3 md:py-4 text-base cursor-pointer'
        >
          {isAvailable ? 'Book Now' : 'Check Availability'}
        </button>
      </form>

      <div className='mt-25 space-y-4'>
        {roomCommonData.map((spec, index) => (
          <div key={index} className='flex items-start gap-2'>
            <img src={spec.icon} alt={`${spec.title}-icon`} className='w-6.5' />
            <div>
              <p className='text-base'>{spec.title}</p>
              <p className='text-gray-500'>{spec.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div>
        <p className='max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500'>
          Guests will be allocated on the ground floor according to availability.
          You get a comfortable two-bedroom apartment that has a true city feeling...
        </p>
      </div>

      <div className='flex flex-col items-start gap-4'>
        <div className='flex gap-4'>
          <div className='h-14 w-14 md:h-18 md:w-18 rounded-full bg-black flex items-center justify-center text-cyan-400 text-lg font-semibold'>
            SH
          </div>
          <div>
            <p className='text-lg md:text-xl'>Hosted by {room.hotel?.name || 'Hotel'}</p>
            <div className='flex items-center mt-1'>
              <StarRating />
              <p className='ml-2'>200+ reviews</p>
            </div>
          </div>
        </div>
        <button className='px-6 py-2.5 mt-4 rounded text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer'>
          Contact Now
        </button>
      </div>
    </div>
  );
};

export default RoomDetails;


