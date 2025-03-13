import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const AddRooms = ({ rooms=[], setRooms = () => {}  }) => {
    const navigate = useNavigate();
    const { id } = useParams(); 
    const location = useLocation(); 

    const [roomNumber, setRoomNumber] = useState("");
    const [roomOccupancy, setRoomOccupancy] = useState("");
    const [roomType, setRoomType] = useState("");
    const [roomPrice, setRoomPrice] = useState("");
    const [roomStatus, setRoomStatus] = useState("");
    const [roomDescription, setRoomDescription] = useState("");
    const [roomMaintenance, setRoomMaintenance] = useState("");

    const roomTypeMapping = {
        "Single": 1,
        "Double": 2,
        "Suite": 3,
        "Deluxe": 4,
        "Family": 5
    };

    const roomTypeReverseMapping = {
        1: "Single",
        2: "Double",
        3: "Suite",
        4: "Deluxe",
        5: "Family"
    };

    useEffect(() => {
        if (id && location.state?.room) {
            const room = location.state.room;
            setRoomNumber(room.room_number);
            setRoomOccupancy(room.max_occupancy);
            setRoomType(roomTypeReverseMapping[room.room_type_id] || ""); // Convert ID to Name
            setRoomPrice(room.price_per_night);
            setRoomStatus(room.room_status);
            setRoomDescription(room.description);
            setRoomMaintenance(room.room_maintenance?.[0]?.maintenance_status || "");
        }
    }, [id, location.state]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const occupancyNumber = parseInt(roomOccupancy, 10);
        const priceNumber = parseFloat(roomPrice);

        if (!roomNumber || !occupancyNumber || isNaN(priceNumber) || !roomDescription) {
            console.error("Invalid form data");
            return;
        }

        try {
            const roomData = {
                room_number: roomNumber,
                max_occupancy: occupancyNumber,
                room_type_id: roomTypeMapping[roomType], 
                price_per_night: priceNumber,
                room_status: roomStatus,
                description: roomDescription,
                room_maintenance: [{ maintenance_status: roomMaintenance }],
            };

            if (id) {
                await axios.put(`/rooms/${id}`, roomData);
                setRooms(rooms.map((room) => (room.id === parseInt(id) ? { ...room, ...roomData } : room)));
            } else {
                
                const resp = await axios.post('/rooms', roomData);
                setRooms([...rooms, resp.data]);
            }

            navigate("/rooms"); 
        } catch (error) {
            console.error("Error saving room:", error);
        }
    };

    return (
        <div className="add-room-container">
            <h1>{id ? "Edit Room" : "Add Room"}</h1>
            <form className="add-room-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="roomNumber">Room Number</label>
                    <input
                        type="number"
                        id="roomNumber"
                        value={roomNumber}
                        onChange={(e) => setRoomNumber(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="roomOccupancy">Occupancy</label>
                    <input
                        type="number"
                        id="roomOccupancy"
                        value={roomOccupancy}
                        onChange={(e) => setRoomOccupancy(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="roomType">Room Type</label>
                    <select
                        id="roomType"
                        value={roomType}
                        onChange={(e) => setRoomType(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select Room Type</option>
                        {Object.keys(roomTypeMapping).map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="pricePerNight">Price Per Night</label>
                    <input
                        type="number"
                        id="pricePerNight"
                        value={roomPrice}
                        onChange={(e) => setRoomPrice(e.target.value === "" ? "" : e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="roomStatus">Room Status</label>
                    <select
                        id="roomStatus"
                        value={roomStatus}
                        onChange={(e) => setRoomStatus(e.target.value)}
                        required
                    >
                        <option value="Available">Available</option>
                        <option value="Occupied">Occupied</option>
                        <option value="Maintenance">Maintenance</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="roomDescription">Description</label>
                    <input
                        type="text"
                        id="roomDescription"
                        value={roomDescription}
                        onChange={(e) => setRoomDescription(e.target.value)}
                        required
                    />
                </div>

                {/* <div className="form-group">
                    <label htmlFor="roomMaintenance">Maintenance Status</label>
                    <input
                        type="text"
                        id="roomMaintenance"
                        value={roomMaintenance}
                        onChange={(e) => setRoomMaintenance(e.target.value)}
                    />
                </div> */}

                <button type="submit" className="submit-button">
                    {id ? "Update Room" : "Add Room"}
                </button>
                <button type="button" className="cancel-button" onClick={() => navigate('/rooms')}>Cancel</button>
            </form>
        </div>
    );
};

export default AddRooms;
