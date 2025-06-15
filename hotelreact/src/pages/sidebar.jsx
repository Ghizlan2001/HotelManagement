import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Bookmark, Users, Calendar, Wrench} from 'lucide-react';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul>
                <li><img src="/logo.png" alt="" /></li>
                <li><Link to="/"> <Home  size={30}/>Home</Link></li>
                <li><Link to="/rooms"><Bookmark  size={30}/>Rooms</Link></li>
                <li><Link to="/guests"><Users size={30}/>Guests</Link></li>
                <li><Link to="/reservations"><Calendar size={30}/>Deals</Link></li>
                <li><Link to="roommaintenance"><Wrench size={30}/>Upkeep</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;
