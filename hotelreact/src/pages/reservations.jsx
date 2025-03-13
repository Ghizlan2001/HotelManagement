import axios from "axios";
import { useEffect, useState } from "react";
import Badge from "../components/badge";
import { Pencil, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Reservations = () => {
    const [Guests, setGuests] = useState([]);
    const [Rooms, setRooms] = useState([]);
    const [Reservations, setReservations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const reservationsPerPage = 6; // Number of reservations per page

    const [selectedStatus, setSelectedStatus] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getGuests();
        getRooms();
        getReservations();
    }, []);

    const getGuests = async () => {
        const resp = await axios.get("/guests");
        setGuests(resp.data);
        console.log(resp.data);
    };

    const getRooms = async () => {
        const resp = await axios.get("/rooms");
        setRooms(resp.data);
        console.log(resp.data);
    };

    const getReservations = async () => {
        const resp = await axios.get("/reservations");
        setReservations(resp.data);
        console.log(resp.data);
    };

    const deleteReservation = async (id) => {
        try {
            const resp = await axios.delete(`/reservations/${id}`);
            console.log(resp.data);
            getReservations();
        }
        catch (err) {
            console.error(err);
        }
    }

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    const filteredReservations = selectedStatus === '' ? Reservations : Reservations.filter(reservation => reservation.reservation_status === selectedStatus);
    
    // Pagination logic
    const indexOfLastReservation = currentPage * reservationsPerPage;
    const indexOfFirstReservation = indexOfLastReservation - reservationsPerPage;
    const currentReservations = filteredReservations.slice(indexOfFirstReservation, indexOfLastReservation);
    const handleAddReservationClick = () => {
            navigate('/addreserv');
        };

 
    return (
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

                    <thead>
                        <tr>
                            <th>Reservation Id</th>
                            <th>Name</th>
                            <th>Room Number</th>
                            <th>Total Amount</th>
                            <th>Reservation Status</th>
                            <th>Room Status</th>
                            <th>Payment Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentReservations.map((reservation) => {
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
                                    <td>
                                        <button onClick={() => navigate(`/addreserv/${reservation.id}`, { state: { reservation } })}>
                                            <Pencil size={20}/>
                                        </button>
                                        <button className="delete" onClick={()=> deleteReservation(reservation.id)}><Trash size={20} /></button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="pagination">
                    <button className="tab" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <span>Page {currentPage} of {Math.ceil(filteredReservations.length / reservationsPerPage)}</span>
                    <button className="tab" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentReservations.length < reservationsPerPage}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Reservations;
