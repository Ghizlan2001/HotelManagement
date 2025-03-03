import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddRooms=({rooms, setRooms})=>{
    const navigate= useNavigate();
    const [roomNumber, setRoomNumber] = useState("");
    const [roomOccupacy, setRoomOccupacy] = useState("");
    const [roomType, setRoomType] = useState("");
    const [roomPrice, setRoomPrice] = useState("");
    const [roomStatus, setRoomStatus] = useState("");
    const [roomDescription, setRoomDescription] = useState("");
    const [roomMaintenance, setRoomMaintenance] = useState("");
    const addNewrooms=async(e)=>{
        e.preventDefault();
        const occupancyNumber = parseInt(roomOccupacy, 10);
        const priceNumber = parseFloat(roomPrice);
    
        if (!roomNumber || !occupancyNumber || isNaN(priceNumber) || !roomDescription) {
          console.error("Invalid form data");
          return;
        }
        try{
            const roomTypeMapping = {
                "Single": 1,
                "Double": 2,
                "Suite": 3,
                "Deluxe":4,
                "Family":5
              };
            const resp=await axios.post('/rooms',{
                room_number:roomNumber,
                max_occupancy:roomOccupacy,
                room_type_id:roomTypeMapping[roomType],
                price_per_night:roomPrice,
                room_status:roomStatus,
                description:roomDescription,
                room_maintenance: [{maintenance_status: roomMaintenance}],
            });
            setRooms([...rooms,resp.data]);
            setRoomNumber("");
            setRoomOccupacy("");
            setRoomType("");
            setRoomPrice("");
            setRoomStatus("");
            setRoomDescription("");
            setRoomMaintenance("");
            console.log("Room added successfully. Redirecting...");
            navigate("/rooms");
            console.log("This should not appear if navigation works.");
            console.log(resp.data);
        }catch(error){
            console.log(error);
        }
    }
return(
    <div className="add-room-container">
    <h1>Add Room</h1>
    <form className="add-room-form" onSubmit={addNewrooms}>
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
        <label htmlFor="roomNumber">Occupacy</label>
        <input
          type="number"
          name="roomOccupancy"
          value={roomOccupacy}
          onChange={(e) => setRoomOccupacy(e.target.value)}
          required
       
        />
      </div>

      <div className="form-group">
        <label htmlFor="roomType">Room Type</label>
        <select
          id="roomType"
          name="roomType"
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
          required
        >
          <option value="" disabled>
            Select Room Type
          </option>
          <option value="Single">Single</option>
          <option value="Double">Double</option>
          <option value="Suite">Suite</option>
          <option value="Family">Family</option>
          <option value="Deluxe">Deluxe</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="pricePerNight">Price Per Night</label>
        <input
          type="number"
          id="pricePerNight"
          name="pricePerNight"
          value={roomPrice}
          onChange={(e) => setRoomPrice(e.target.value === "" ? "" : e.target.valueAsNumber)}
          required
        />
      </div>


      <div className="form-group">
        <label htmlFor="roomStatus">Room Status</label>
        <select
          id="roomStatus"
          name="roomStatus"
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
          name="roomDescription"
          value={roomDescription}
          onChange={(e) => setRoomDescription(e.target.value)}
          required
       
        />
        </div>

      <button type="submit" className="submit-button">
        Add Room
      </button>
    </form>
  </div>
)
};export default AddRooms;