import React, { useState } from 'react';
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

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewReservation({ ...newReservation, [name]: value });
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
                        <label>Guest ID:</label>
                        <input type="text" name="guest_id" value={newReservation.guest_id} onChange={handleInputChange} required />
                    </div>
                    <div>
                        <label>Room ID:</label>
                        <input type="text" name="room_id" value={newReservation.room_id} onChange={handleInputChange} required />
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
                        <input type="text" name="reservation_status" value={newReservation.reservation_status} onChange={handleInputChange} required />
                    </div>
                    <div>
                        <label>Total Amount:</label>
                        <input type="number" step="0.01" name="total_amount" value={newReservation.total_amount} onChange={handleInputChange} required />
                    </div>
                    <div>
                        <label>Payment Status:</label>
                        <input type="text" name="payment_status" value={newReservation.payment_status} onChange={handleInputChange} required />
                    </div>
                    <button type="submit">Submit</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default AddReservationForm;