import axios from "axios";
import { Pencil, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import Badge from "../components/badge";
import { useNavigate } from "react-router-dom";
import AddRooms from "./addrooms";

const Rooms = ({ rooms, setRooms }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 6; // Number of rooms per page

  const navigate = useNavigate();
  const [originalRooms, setOriginalRooms] = useState([]);
  useEffect(() => {
    getRooms();
  }, []);
  const getRooms = async () => {
    const resp = await axios.get("/rooms");
    setRooms(resp.data);
    setOriginalRooms(resp.data);
    console.log(resp.data);
  };
  const addroom = () => {
    navigate("/addrooms");
  };
  const AvailableRooms = () => {
    setRooms(originalRooms.filter((room) => room.room_status === "Available"));
  };

  const BookedRooms = () => {
    setRooms(originalRooms.filter((room) => room.room_status === "Occupied"));
  };
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);
  const deleteRoom = async (id) => {
    console.log("Deleting room with ID:", id);
    try {
      const resp = await axios.delete(`/rooms/${id}`);
      console.log(resp.data);
      getRooms();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h6 className="title">Rooms</h6>
      <div className="content">
        <header>
          <div className="header">
            <button className="tab" onClick={() => setRooms(originalRooms)}>
              All rooms
            </button>
            <button className="tab" onClick={AvailableRooms}>
              Available rooms
            </button>
            <button className="tab" onClick={BookedRooms}>
              Booked rooms
            </button>
          </div>
          <button className="add" onClick={addroom}>
            Add room
          </button>
        </header>

        <table>
          <tr>
            <th>Room number</th>
            <th>Room type</th>
            <th>Room status</th>
            <th>Price per night</th>
            <th>Room Description</th>
            <th>Actions</th>
          </tr>
          {currentRooms.map((room, index) => (
            <tr key={index}>
              <td>{room.room_number}</td>
              <td>{room.room_type ? room.room_type.room_type_name : "N/A"}</td>

              <td>
                {room.room_status === "Maintenance" ? (
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/roomMaintenance")}
                  >
                    <Badge>{room.room_status}</Badge>
                  </span>
                ) : (
                  <Badge>{room.room_status}</Badge>
                )}
              </td>

              <td>{room.price_per_night}</td>
              <td>{room.description}</td>
              <td>
                <button
                  onClick={() =>
                    navigate(`/addroom/${room.id}`, { state: { room } })
                  }
                  className="edit-btn"
                >
                  <Pencil size={20} />
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteRoom(room.id)}
                >
                  <Trash size={20} />
                </button>
              </td>
            </tr>
          ))}
        </table>
        <div className="pagination">
          <button
            className="tab"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of{" "}
            {Math.ceil(originalRooms.length / roomsPerPage)}
          </span>

          <button
            className="tab"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={indexOfLastRoom >= originalRooms.length}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
export default Rooms;
