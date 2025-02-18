import { useState } from "react";

const AddMaintenance = () => {
    const [roomNumber, setRoomNumber] = useState("");
    const [roomMaintenance, setRoomMaintenance] = useState("");
    const [roomDescription, setMaintenanceDescription] = useState("");
    return (
        <div className="add-room-container">
            <h1>Add Maintenance</h1>
            <form className="add-room-form" >
                <div className="form-group">
                    <label htmlFor="roomNumber">Room Number</label>
                    <input
                    type="number"
                    id="roomNumber"
                    name="roomNumber"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                    required
                
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="roomMaintenance">Room maintenance</label>
                    <select
                    id="roomMaintenance"
                    name="roomMaintenance"
                    value={roomMaintenance}
                    onChange={(e) => setRoomMaintenance(e.target.value)}
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
                <button type="submit" className="submit-button">
                Add Room Maintenance
                </button>
            </form>
        </div>
    );
}; export default AddMaintenance;