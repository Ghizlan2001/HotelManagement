import { useEffect, useState } from "react";
import { useMemo } from "react";

import Badge from "../components/badge";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const RoomMaintenance=({roomMaintenance, setRoomMaintenance})=>{
    const [currentPage, setCurrentPage] = useState(1);
    const roomsPerPage = 6;
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

    const indexOfLastMaintenance = currentPage * roomsPerPage;
    const indexOfFirstMaintenance = indexOfLastMaintenance - roomsPerPage;
    const currentMaintenance = sortedMaintenance.slice(indexOfFirstMaintenance, indexOfLastMaintenance);

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
                        currentMaintenance.map((maintenance) => (
                            <tr key={maintenance.id}>
                                <td>{maintenance.room?.room_number || "No Room Assigned"}</td>
                                <td><Badge>{maintenance.maintenance_status}</Badge></td>
                                <td>{maintenance.issue_description}</td>
                                <td>{maintenance.maintenance_date}</td>
                            </tr>
                        ))
                    }
                    </table>
             </div>
             <div className="pagination">
                <button className="tab" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>Page {currentPage} of {Math.ceil(sortedMaintenance.length / roomsPerPage)}</span>

                <button className="tab" onClick={() => setCurrentPage(currentPage + 1)} disabled={indexOfLastMaintenance >= sortedMaintenance.length}>
                    Next
                </button>
            </div>       
    </div>
    )
};export default RoomMaintenance;
