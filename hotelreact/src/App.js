import './App.css';
import Rooms from './pages/rooms';
import Guests from './pages/guests';
import Sidebar from './pages/sidebar';
import Reservations from './pages/reservations';
import RoomMaintenance from './pages/roomMaintenance';
import AddRooms from './pages/addrooms';
import AddMaintenance from './pages/AddRoomMaintenance';
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
        <nav>
        <ul>
          <li><input type='search' placeholder='search for rooms'/></li>
        </ul>
      </nav>
      </div>

        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/rooms" element={<Rooms setRooms={setRooms} rooms={rooms} />} />

            <Route path="/guests" element={<Guests />} />
            <Route path="/reservations" element={ <Reservations />} />
            <Route path='/addrooms' element={<AddRooms setRooms={setRooms} Rooms={Rooms}/>}/>
            <Route path='/roommaintenance' element={<RoomMaintenance roomMaintenance={roomMaintenance} setRoomMaintenance={setRoomMaintenance}/>}/>
            <Route path='/addroommaintenance' element={<AddMaintenance roomMaintenance={roomMaintenance} setRoomMaintenance={setRoomMaintenance}/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
