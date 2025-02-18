import './App.css';
import Rooms from './pages/rooms';
import Guests from './pages/guests';
import Sidebar from './pages/sidebar';
import RoomMaintenance from './pages/roomMaintenance';
import AddRooms from './pages/addrooms';
import AddMaintenance from './pages/AddRoomMaintenance';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [rooms, setRooms]=useState([]);
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
            <Route path="/rooms" element={<Rooms setRooms={setRooms} rooms={rooms} />} />
            <Route path="/guests" element={<Guests />} />
            <Route path='/addrooms' element={<AddRooms setRooms={setRooms} Rooms={Rooms}/>}/>
            <Route path='/roommaintenance' element={<RoomMaintenance/>}/>
            <Route path='/addroommaintenance' element={<AddMaintenance/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
