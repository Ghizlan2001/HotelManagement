import axios from "axios";
import { useEffect, useState } from "react";
import Badge from "../components/badge";
import AddReservationForm from "../components/reservModal";

const Reservations = () => {
    const [Guests, setGuests]= useState([]);
    const [Rooms, setRooms]= useState([]);
    const [Reservations, setReservations] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(()=>{
        getGuests();
        getRooms();
        getReservations();
    },[]);

    const getGuests=async()=>{
        const resp = await axios.get("/guests");
        setGuests(resp.data);
        console.log(resp.data)
    }

    const getRooms=async()=>{
        const resp =await axios.get("/rooms")
        setRooms(resp.data);
        console.log(resp.data);
    }

    const getReservations = async () => {
        const resp = await axios.get("/reservations");
        setReservations(resp.data);
        console.log(resp.data);
    };

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    const filteredReservations = selectedStatus === '' ? Reservations : Reservations.filter(reservation => {
        return reservation.reservation_status === selectedStatus;
    });
    

    const handleAddReservationClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleAddReservationSubmit = async (newReservation) => {
        await axios.post("/reservations", newReservation);
        getReservations(); 
        setIsModalOpen(false);
    };

return(
    <div className="container">
        <h6 className="title">Reservations</h6>
        <div className="content">
            <header>
                <div className="header">
                    <select onChange={handleStatusChange} value={selectedStatus} className="tab">
                        <option value="">All</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Pending">Pending</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
                <button className="add" onClick={handleAddReservationClick}>Add reservation</button>
            </header>
            <table>
                <tr>
                    <th>Reservation Id</th>
                    <th>Name</th>
                    <th>Room Number</th>
                    <th>Total Amount</th>
                    <th>Reservation Status</th>
                    <th>Room Status</th>
                    <th>Payment Status</th>
                </tr>
                {filteredReservations.map((reservation) => {
                    const guest = Guests.find(guest => guest.id === reservation.guest_id);
                    const room = Rooms.find(room => room.id === reservation.room_id);
                    return (
                        <tr key={reservation.id}>
                            <td>{reservation.id}</td>
                            <td>{guest ? `${guest.first_name} ${guest.last_name}` : 'Unknown'}</td>
                            <td>{room ? room.room_number : 'Unknown'}</td>
                            <td>{reservation.total_amount}</td>
                            <td><Badge>{reservation.reservation_status}</Badge></td>
                            <td><Badge>{room ? room.room_status : 'Unknown'}</Badge></td>
                            <td><Badge>{reservation.payment_status}</Badge></td>
                        </tr>
                    );
                })}
            </table>
        </div>
        {isModalOpen && <AddReservationForm onClose={handleCloseModal} onSubmit={handleAddReservationSubmit} />}
    </div>
);
};
export default Reservations;