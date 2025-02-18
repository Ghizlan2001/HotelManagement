import { useEffect, useState } from "react";
import Badge from "../components/badge";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const RoomMaintenance=({roomMaintenance, setRoomMaintenance})=>{
    const navigate=useNavigate();
    useEffect(()=>{
        getRoomMaintenance();
    },[]);
    const getRoomMaintenance=async()=>{
        const resp = await axios.get("/room-maintenance");
        setRoomMaintenance(resp.data);
        console.log(resp.data)
    }
    const AddMaintenance=()=>{
        navigate('/addroommaintenance');
    }
    return(
    <div className="container">
        <h6 className="title">Room Maintenance</h6>
            <div className="content">
            <header>
            <div className="header">
            <button className="tab" >Oldest</button>
            <button className="tab" > Newest</button>
            </div>
            <button className="add" onClick={AddMaintenance}>Add Room Maintenance</button>
            </header>
                <table>
                    <tr>
                        <th>Room Number</th>
                        <th>Maintenance type</th>
                        <th>Description</th>
                        
                        <th>Maintenance date</th>
                    </tr>
                    {
                        roomMaintenance.map((rooms, index) => (
                        <tr key={index}>
                            <td>{rooms.room_id}</td>
                            <td><Badge>{rooms.maintenance_status}</Badge></td>
                            <td>{rooms.issue_description}</td>
                            {/* <td>{room.maintenance_costs}</td> */}
                            <td>{rooms.maintenance_date}</td>
                        </tr>
                        ))
                    }
                    </table>
             </div>       
    </div>
    )
};export default RoomMaintenance;