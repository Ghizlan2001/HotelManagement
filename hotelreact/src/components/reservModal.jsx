import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './modal.css'; 

const AddReservationForm = ({ onClose, onSubmit }) => {
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
    const reservationStatus = ['Confirmed', 'Pending', 'Cancelled'];
    const paymentStatus = ['Completed', 'Pending', 'Refunded'];

    useEffect(() => {
        fetchGuests();
        fetchRooms();
    }, []);

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

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(newReservation);
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
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>X</button>
                <h2>Add Reservation</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Guest Name:</label>
                        <select name="guest_id" value={newReservation.guest_id} onChange={handleGuestChange} required>
                            <option value="">Select Guest</option>
                            {guests.map(guest => (
                                <option key={guest.id} value={guest.id}>{guest.first_name} {guest.last_name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Room Number:</label>
                        <select name="room_id" value={newReservation.room_id} onChange={handleRoomChange} required>
                            <option value="">Select Room</option>
                            {rooms.map(room => (
                                <option key={room.id} value={room.id}>{room.room_number}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Check-in Date:</label>
                        <input type="date" name="check_in_date" value={newReservation.check_in_date} onChange={handleInputChange} required />
                    </div>
                    <div>
                        <label>Check-out Date:</label>
                        <input type="date" name="check_out_date" value={newReservation.check_out_date} onChange={handleInputChange} required />
                    </div>
                    <div>
                        <label>Number of Guests:</label>
                        <input type="number" name="number_of_guests" value={newReservation.number_of_guests} onChange={handleInputChange} required />
                    </div>
                    <div>
                        <label>Reservation Status:</label>
                        <select name="reservation_status" value={newReservation.reservation_status} onChange={handleInputChange} required>
                            {reservationStatus.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Total Amount:</label>
                        <input type="number" step="0.01" name="total_amount" value={newReservation.total_amount} onChange={handleInputChange} required />
                    </div>
                    <div>
                        <label>Payment Status:</label>
                        <select name="payment_status" value={newReservation.payment_status} onChange={handleInputChange} required>
                            {paymentStatus.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit">Submit</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default AddReservationForm;