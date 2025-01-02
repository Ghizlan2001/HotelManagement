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
    <div>
        <h6>Room</h6>
        <table border={2}>
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
                <td>{room.room_status}</td>
                <td>{room.price_per_night}</td>
                <td>
                {room.reservations && room.reservations.length > 0
                    ? room.reservations[0].payment_status
                    : "No payment"}
            </td>
            <td>
                {room.room_maintenance && room.room_maintenance.length > 0
                    ? room.room_maintenance[0].maintenance_status // Display the status of the latest maintenance
                    : "No maintenance"}
            </td>
            </tr>
        ))
}
        </table>
    </div>
);
};export default Rooms;