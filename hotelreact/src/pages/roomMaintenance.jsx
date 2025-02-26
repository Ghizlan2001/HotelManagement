import { useEffect, useState } from "react";
import { useMemo } from "react";

import Badge from "../components/badge";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const RoomMaintenance=({roomMaintenance, setRoomMaintenance})=>{
    const navigate=useNavigate();
    const [sortOrder, setSortOrder] = useState('newToOld');
    
    const sortedMaintenance = useMemo(() => {
        const sorted = [...roomMaintenance];
        sorted.sort((a, b) => {
            const dateA = new Date(a.maintenance_date);
            const dateB = new Date(b.maintenance_date);
            return sortOrder === 'newToOld' ? dateB - dateA : dateA - dateB;
        });
        return sorted;
    }, [roomMaintenance, sortOrder]);

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
            <button 
                className={`tab ${sortOrder === 'newToOld' ? 'active' : ''}`} 
                onClick={() => setSortOrder('newToOld')}
            >
                New to Old
            </button>
            <button 
                className={`tab ${sortOrder === 'oldToNew' ? 'active' : ''}`} 
                onClick={() => setSortOrder('oldToNew')}
            >
                Old to New
            </button>

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
                        sortedMaintenance.map((rooms) => (

                        <tr key={rooms.id}>
                            <td>{rooms.room.room_number}</td>
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
