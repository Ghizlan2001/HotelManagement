import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
const AddReservationForm = () => {
    const [newReservation, setNewReservation] = useState({
        guest_id: '',
        room_id: '',
        check_in_date: '',
        check_out_date: '',
        number_of_guests: '',
        reservation_status: 'Confirmed',
        total_amount: '',
        payment_status: 'Pending'
    });
    const [guests, setGuests] = useState([]);
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();


    useEffect(() => {
        fetchGuests();
        fetchRooms();
    }, []);
    useEffect(() => {
                if (id && location.state?.reservation) {
                    const reservation = location.state.reservation;
                    setNewReservation(reservation);
                }
    }, [id, location.state]);

    const fetchGuests = async () => {
        try {
            const response = await axios.get('/guests');
            setGuests(response.data);
        } catch (error) {
            console.error('Error fetching guests:', error);
        }
    };

    const fetchRooms = async () => {
        try {
            const response = await axios.get('/rooms');
            setRooms(response.data);
        } catch (error) {
            console.error('Error fetching rooms:', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewReservation({ ...newReservation, [name]: value });
    };

    const handleGuestChange = (event) => {
        const selectedGuest = guests.find(guest => guest.id === parseInt(event.target.value));
        setNewReservation({ ...newReservation, guest_id: selectedGuest.id });
    };

    const handleRoomChange = (event) => {
        const selectedRoom = rooms.find(room => room.id === parseInt(event.target.value));
        setNewReservation({ ...newReservation, room_id: selectedRoom.id });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!newReservation.guest_id || !newReservation.room_id || !newReservation.check_in_date || !newReservation.check_out_date || !newReservation.number_of_guests || !newReservation.total_amount) {
            alert('Please fill in all fields');
            return;
        }
        try {
            await axios.post("/reservations", newReservation);
            alert("Reservation added successfully");
            setNewReservation({
                guest_id: '',
                room_id: '',
                check_in_date: '',
                check_out_date: '',
                number_of_guests: '',
                reservation_status: 'Confirmed',
                total_amount: '',
                payment_status: 'Pending'
            });
            navigate('/reservations');
        } catch (error) {
            console.error('Error adding reservation:', error);
        }
    };

    return (
        <div className="add-reservation-container">
            <h1>Add Reservation</h1>
            <form onSubmit={handleSubmit} className="add-reservation-form">
                <div className="form-group">
                    <label>Guest Name:</label>
                    <select name="guest_id" value={newReservation.guest_id} onChange={handleGuestChange} required>
                        <option value="">Select Guest</option>
                        {guests.map(guest => (
                            <option key={guest.id} value={guest.id}>{guest.first_name} {guest.last_name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Room Number:</label>
                    <select name="room_id" value={newReservation.room_id} onChange={handleRoomChange} required>
                        <option value="">Select Room</option>
                        {rooms.map(room => (
                            <option key={room.id} value={room.id}>{room.room_number}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Check-in Date:</label>
                    <input type="date" name="check_in_date" value={newReservation.check_in_date} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Check-out Date:</label>
                    <input type="date" name="check_out_date" value={newReservation.check_out_date} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Number of Guests:</label>
                    <input type="number" name="number_of_guests" value={newReservation.number_of_guests} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Reservation Status:</label>
                    <select name="reservation_status" value={newReservation.reservation_status} onChange={handleInputChange} required>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Pending">Pending</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Total Amount:</label>
                    <input type="number" step="0.01" name="total_amount" value={newReservation.total_amount} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Payment Status:</label>
                    <select name="payment_status" value={newReservation.payment_status} onChange={handleInputChange} required>
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending</option>
                        <option value="Refunded">Refunded</option>
                    </select>
                </div>
                <button type="submit" className="submit-button">Add Reservation</button>
                <button type="button" className="cancel-button" onClick={() => navigate('/reservations')}>Cancel</button>
            </form>
        </div>
    );
};

export default AddReservationForm;
