import axios from "axios";
import { useEffect, useState } from "react";
import Badge from "../components/badge";
import { useNavigate } from "react-router-dom";
import AddRooms from "./addrooms";

const Rooms=({rooms, setRooms})=>{
    const navigate = useNavigate();
    useEffect(()=>{
        getRooms();
    },[]);
    const getRooms=async()=>{
        const resp = await axios.get("/rooms");
        setRooms(resp.data);
        console.log(resp.data)
    }
const addroom=()=>{
    navigate('/addrooms');
}
return(
    <div className="container">
        <h6 className="title">Rooms</h6>
        <div className="content">
           <header>
            <div className="header">
            <a href="" className="tab">All rooms</a>
            <a href="" className="tab">Available rooms</a>
            <a href="" className="tab">Booked rooms</a>
            </div>
            <button className="add" onClick={addroom}>Add room</button>
            </header>
            
            <table>
                <tr>
                    <th>Room number</th>
                    <th>Room type</th>
                    <th>Reservation status</th>
                    <th>Room status</th>
                    <th>Price per night</th>
                    <th>Payment status</th>
                    <th>Room maintenance</th>
                </tr>
                {
                    rooms.map((room, index) => (
                <tr key={index}>
                    <td>{room.room_number}</td>
                    <td>{room.room_type.room_type_name}</td>
                    <td><Badge>
                    {room.reservations && room.reservations.length > 0
                        ? room.reservations[0].reservation_status
                        : "No reservations"}
                        </Badge>
                    </td>
                    <td><Badge>{room.room_status}</Badge></td>
                    <td>{room.price_per_night}</td>
                    <td><Badge>
                    {room.reservations && room.reservations.length > 0
                        ? room.reservations[0].payment_status
                        : "No payment"}
                        </Badge>
                </td>
                <td><Badge>
                   
                    {room.room_maintenance && room.room_maintenance.length > 0
                        ? room.room_maintenance[0].maintenance_status // Display the status of the latest maintenance
                        : "No maintenance"}
                    </Badge>
                </td>
                </tr>
            ))
    }
            </table>
        </div>
    </div>
);
};export default Rooms;