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
    getRooms();
return(
    <div>
        <h6>Room</h6>
        <table>
            <tr>
                <th>Room number</th>
                <th>Bed type</th>
                <th>Room floor</th>
                <th>Room facility</th>
                <th>status</th>
            </tr>
        </table>
    </div>
);
};export default Rooms;