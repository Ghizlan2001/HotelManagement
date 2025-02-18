import { useEffect, useState } from "react";
import Badge from "../components/badge";
import axios from "axios";
const RoomMaintenance=()=>{
    const [roomMaintenance, setRoomMaintenance]=useState([]);
    useEffect(()=>{
        getRoomMaintenance();
    },[]);
    const getRoomMaintenance=async()=>{
        const resp = await axios.get("/room-maintenance");
        setRoomMaintenance(resp.data);
        console.log(resp.data)
    }
    return(
    <div className="container">
        <h6 className="title">Room Maintenance</h6>
            <div className="content">
                <table>
                    <tr>
                        <th>Room id</th>
                        <th>Maintenance type</th>
                        <th>Description</th>
                        
                        <th>Maintenance date</th>
                    </tr>
                    {
                        roomMaintenance.map((room, index) => (
                        <tr key={index}>
                            <td>{room.room_id}</td>
                            <td><Badge>{room.maintenance_status}</Badge></td>
                            <td>{room.issue_description}</td>
                            {/* <td>{room.maintenance_costs}</td> */}
                            <td>{room.maintenance_date}</td>
                        </tr>
                        ))
                    }
                    </table>
             </div>       
    </div>
    )
};export default RoomMaintenance;