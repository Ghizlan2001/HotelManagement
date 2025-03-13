import './App.css';
import Rooms from './pages/rooms';
import Guests from './pages/guests';
import Sidebar from './pages/sidebar';
import Reservations from './pages/reservations';
import RoomMaintenance from './pages/roomMaintenance';
import AddRooms from './pages/addrooms';
import AddMaintenance from './pages/AddRoomMaintenance';
import AddGuestForm from './pages/addguest';
import AddReservationForm from './pages/addreserv';
import Dashboard from './pages/dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [rooms, setRooms]=useState([]);
  const [roomMaintenance, setRoomMaintenance]=useState([]);
  return (
    <div className="App">
      <BrowserRouter>
        <div>
        <Sidebar />
      </div>

        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/rooms" element={<Rooms setRooms={setRooms} rooms={rooms} />} />
            <Route path="/guests" element={<Guests />} />
            <Route path="/addguest" element={< AddGuestForm />} />
            <Route path="/addreserv" element={< AddReservationForm />} />
            <Route path="/reservations" element={ <Reservations />} />
            <Route path='/addrooms' element={<AddRooms setRooms={setRooms} rooms={rooms}/>}/>
            <Route path='/roommaintenance' element={<RoomMaintenance roomMaintenance={roomMaintenance} setRoomMaintenance={setRoomMaintenance}/>}/>
            <Route path='/addroommaintenance' element={<AddMaintenance roomMaintenance={roomMaintenance} setRoomMaintenance={setRoomMaintenance}/>}/>
            <Route path="/addroom/:id" element={<AddRooms />} />
            <Route path="/addroommaintenance/:id" element={<AddMaintenance />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
