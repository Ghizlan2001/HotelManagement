import axios from "axios";
import { useEffect, useState } from "react";

const Rooms=()=>{
    const [Rooms, setRooms]=useState([]);
    useEffect(()=>{
        getRooms();
    },[]);
    const getRooms=async()=>{
        const resp = await axios.get("/rooms");
        setRooms(resp.data);
        console.log(resp.data)
    }
return(
    <div className="container">
        <h6 className="title">Room</h6>
        <div className="content">
           <header>
            <div className="header">
            <a href="" className="tab">All rooms</a>
            <a href="" className="tab">Available rooms</a>
            <a href="" className="tab">Booked rooms</a>
            </div>
            <button className="add">Add room</button>
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
                    Rooms.map((room, index) => (
                <tr key={index}>
                    <td>{room.room_number}</td>
                    <td>{room.room_type.room_type_name}</td>
                    <td>
                    {room.reservations && room.reservations.length > 0
                        ? room.reservations[0].reservation_status
                        : "No reservations"}
                    </td>
                    <td><span>{room.room_status}</span></td>
                    <td>{room.price_per_night}</td>
                    <td>
                    {room.reservations && room.reservations.length > 0
                        ? room.reservations[0].payment_status
                        : "No payment"}
                </td>
                <td>
                    <span>
                    {room.room_maintenance && room.room_maintenance.length > 0
                        ? room.room_maintenance[0].maintenance_status // Display the status of the latest maintenance
                        : "No maintenance"}
                    </span>
                </td>
                </tr>
            ))
    }
            </table>
        </div>
    </div>
);
};export default Rooms;