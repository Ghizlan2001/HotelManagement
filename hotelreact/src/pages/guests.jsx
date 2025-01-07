import axios from "axios";
import { useEffect, useState } from "react";
import Badge from "../components/badge";

const Guests=()=>{
    const [Guests, setGuests]= useState([]);
    const [Rooms, setRooms]= useState([]);
    useEffect(()=>{
        getGuests();
        getRooms();
    },[]);
    const getGuests=async()=>{
        const resp = await axios.get("/guests");
        setGuests(resp.data);
        console.log(resp.data)
    }
    const getRooms=async()=>{
        const resp =await axios.get("/rooms")
        setRooms(resp.data);
        console.log(resp.data);
    }
    // const statusStyles = {
    //     "Available": { backgroundColor: "green", color: "white", padding: "5px", borderRadius: "5px" },
    //     "Occupied": { backgroundColor: "red", color: "white", padding: "5px", borderRadius: "5px" },
    //     "Maintenance": { backgroundColor: "yellow", color: "black", padding: "5px", borderRadius: "5px" },
    //   };
return(
    <div className="container">
        <h6 className="title">Guests</h6>
        <div className="content">
            <div className="header">
            <header>
                <div>
                    <a href="" className="tab">Check In</a>
                    <a href="" className="tab">Check Out</a>
                </div>
                <div>
                </div>
            </header>
            </div>
            <table>
                <tr>
                    <th>Reservation Id</th>
                    <th>Name</th>
                    <th>Room Number</th>
                    <th>Total Amount</th>
                    <th>Reservation Status</th>
                    <th>Room Status</th>
                </tr>
                {Guests.map((guest)=>(
                    guest.reservations.map((reservation) => {
                        const room = Rooms.find(room => room.id === reservation.room_id);
                        return(
                            <tr key={reservation.id}>
                                <td>{reservation.id}</td>
                                <td>{guest.first_name} {guest.last_name}</td>
                                <td>{reservation.room_id}</td>
                                <td>{reservation.total_amount}</td>
                                <td><Badge>{reservation.reservation_status}</Badge></td>
                                <td><Badge>{room ? room.room_status : 'Unknown'}</Badge></td>
                            </tr>
                        )
                    })
                ))}
            </table>
        </div>
    </div>
);
};
export default Guests;