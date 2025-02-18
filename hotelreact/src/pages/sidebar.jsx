import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul>
                <li><Link to="/rooms">Rooms</Link></li>
                <li><Link to="/guests">Guests</Link></li>
                <li><Link to="/reservations">Reservations</Link></li>
                <li><Link to="roommaintenance">RoomMaintenance</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;