import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddMaintenance = ({roomMaintenance, setRoomMaintenance}) => {
    const [roomId, setRoomId] = useState("");
    const [roomMaintenanceStatus, setRoomMaintenanceStatus] = useState("");
    const [roomDescription, setMaintenanceDescription] = useState("");
    const [MaintenanceDate, setMaintenanceDate] = useState("");
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();
    const AddNewMaintenance=async(e)=>{
        e.preventDefault();
        if (!roomId || !roomDescription|| !MaintenanceDate) {
            console.error("Invalid form data");
            return;
          }
          try {
        const resp=await axios.post('/room-maintenance',{
            room_id:roomId,
            issue_description:roomDescription,
            maintenance_status: roomMaintenanceStatus,
            maintenance_date: MaintenanceDate

        });
        setRoomMaintenance([...roomMaintenance,resp.data]);
        setRoomId("");
        setMaintenanceDescription("");
        setRoomMaintenanceStatus("");
        setMaintenanceDate("");
        console.log(resp.data);
        navigate("/roommaintenance");
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        const fetchRooms = async () => {
          try {
            const response = await axios.get('/rooms');
            setRooms(response.data);
          } catch (error) {
            console.error('Error fetching rooms:', error);
          }
        };
        fetchRooms();
      }, []);
    return (
        <div className="add-room-container">
            <h1>Add Maintenance</h1>
            <form className="add-room-form" onSubmit={AddNewMaintenance}>
            <div className="form-group">
                    <label htmlFor="roomId">Room Number</label>
                    <select
                    id="roomId"
                    name="roomId"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    required
                    >
                    <option value="">Select Room</option>
                    {rooms?.length > 0 ? (
                        rooms.map((room) => (
                            <option key={room?.id} value={room?.id}>
                            {room?.room_number || "Unknown Room"}
                            </option>
                        ))
                        ) : (
                        <option disabled>Loading rooms...</option>
                        )}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="roomMaintenance">Room maintenance</label>
                    <select
                    id="roomMaintenance"
                    name="roomMaintenance"
                    value={roomMaintenanceStatus}
                    onChange={(e) => setRoomMaintenanceStatus(e.target.value)}
                    required
                    >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>

                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="roomDescription">Description</label>
                    <input
                    type="text"
                    id="roomDescription"
                    name="roomDescription"
                    value={roomDescription}
                    onChange={(e) => setMaintenanceDescription(e.target.value)}
                    required
                
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="MaintenanceDate">Maintenance Date</label>
                    <input
                    type="date"
                    id="MaintenanceDate"
                    name="MaintenanceDate"
                    value={MaintenanceDate}
                    onChange={(e) => setMaintenanceDate(e.target.value)}
                    required
                
                    />
                </div>
                <button type="submit" className="submit-button" >
                Add Room Maintenance
                </button>
            </form>
        </div>
    );
};
export default AddMaintenance;