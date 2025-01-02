import axios from "axios";
import { useEffect, useState } from "react";

const Guests=()=>{
    const [Guests, setGuests]=useState([]);
    useEffect(()=>{
        getGuests();
    },[]);
    const getGuests=async()=>{
        const resp = await axios.get("/guests");
        setGuests(resp.data);
        console.log(resp.data)
    }
    getGuests();
return(
    <div>
        <h6>Guests</h6>
        <table>
            <tr>
                <th>Reservation Id</th>
                <th>Name</th>
                <th>Room Number</th>
                <th>Total Amount</th>
                <th>Status</th>
            </tr>
            {Guests.map((guest)=>(
                guest.reservations.map((reservation) => (
                    <tr key={reservation.id}>
                        <td>{guest.first_name} {guest.last_name}</td>
                        <td>{reservation.room_id}</td>
                        <td>{reservation.total_amount}</td>
                        <td>{reservation.reservation_status}</td>
                    </tr>
                ))
            ))}
        </table>
    </div>
);
};
export default Guests;