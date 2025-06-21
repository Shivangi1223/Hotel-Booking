import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home';
import Footer from './components/Footer';
import AllRooms from './pages/AllRooms';
import RoomDetails from './pages/RoomDetails';
import MyBooking from './pages/MyBooking';
import HotelReg from './components/HotelReg';
import Layout from './pages/hotelOwner/Layout';
import Dashboard from './pages/hotelOwner/Dashboard';
import AddRoom from './pages/AddRoom';
import ListRoom from './pages/ListRoom';



const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");

  return (
    <div className='flex flex-col min-h-screen'>
      {!isOwnerPath && <Navbar />}
      {false && <HotelReg />}

      {/* Page content */}
      <main className='flex-1'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/rooms' element={<AllRooms />} />
          <Route path='/rooms/:id' element={<RoomDetails />} />
           <Route path='/my-bookings' element={<MyBooking />} />
           <Route path='/owner' element={<Layout />}>
              <Route index element={<Dashboard />}/>
               <Route path='add-room' element={<AddRoom />} />
               <Route path='list-room' element={<ListRoom />} />
           </Route>
        </Routes>
      </main>

      {!isOwnerPath && <Footer />}
    </div>
  )
}

export default App;
