import axios from "axios";
import { useEffect, useState } from "react";
import Badge from "../components/badge";
import { useNavigate } from "react-router-dom";
import AddRooms from "./addrooms";

const Rooms=({rooms, setRooms})=>{
    const navigate = useNavigate();
    const [originalRooms, setOriginalRooms] = useState([]);
    useEffect(()=>{
        getRooms();
    },[]);
    const getRooms=async()=>{
        const resp = await axios.get("/rooms");
        setRooms(resp.data);
        setOriginalRooms(resp.data);
        console.log(resp.data)
    }
const addroom=()=>{
    navigate('/addrooms');
}
const AvailableRooms = () => {
    setRooms(originalRooms.filter((room) => room.room_status === "Available"));
};

const BookedRooms = () => {
    setRooms(originalRooms.filter((room) => room.room_status === "Occupied"));
};
return(
    <div className="container">
        <h6 className="title">Rooms</h6>
        <div className="content">
           <header>
            <div className="header">
            <button className="tab" onClick={() => setRooms(originalRooms)}>All rooms</button>
            <button className="tab" onClick={AvailableRooms}>Available rooms</button>
            <button className="tab" onClick={BookedRooms}>Booked rooms</button>
            </div>
            <button className="add" onClick={addroom}>Add room</button>
            </header>
            
            <table>
                <tr>
                    <th>Room number</th>
                    <th>Room type</th>
                    <th>Room status</th>
                    <th>Price per night</th>
                    <th>Room Description</th>
                </tr>
                {
                    rooms.map((room, index) => (
                <tr key={index}>
                    <td>{room.room_number}</td>
                    <td>{room.room_type.room_type_name}</td>
                    <td>
                        {room.room_status === "Maintenance" ? (
                            <span 
                                style={{ cursor: 'pointer' }} 
                                onClick={() => navigate('/roomMaintenance')}
                            >
                                <Badge>{room.room_status}</Badge>
                            </span>
                        ) : (
                            <Badge>{room.room_status}</Badge>
                        )}
                    </td>

                    <td>{room.price_per_night}</td>
                    <td>{room.description}</td>
                </tr>
            ))
    }
            </table>
        </div>
    </div>
);
};export default Rooms;
