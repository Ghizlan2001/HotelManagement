import React, { useState } from 'react';
import './modal.css'; 

const AddGuestForm = ({ onClose, onSubmit }) => {
    const [newGuest, setNewGuest] = useState({
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        address: '',
        identification_type: '',
        identification_number: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewGuest({ ...newGuest, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(newGuest);
        setNewGuest({
            first_name: '',
            last_name: '',
            phone_number: '',
            email: '',
            address: '',
            identification_type: '',
            identification_number: ''
        });
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>X</button>
                <h2>Add Guest</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>First Name:</label>
                        <input type="text" name="first_name" value={newGuest.first_name} onChange={handleInputChange} required />
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <input type="text" name="last_name" value={newGuest.last_name} onChange={handleInputChange} required />
                    </div>
                    <div>
                        <label>Phone Number:</label>
                        <input type="text" name="phone_number" value={newGuest.phone_number} onChange={handleInputChange} required />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" name="email" value={newGuest.email} onChange={handleInputChange} required />
                    </div>
                    <div>
                        <label>Address:</label>
                        <input type="text" name="address" value={newGuest.address} onChange={handleInputChange} required />
                    </div>
                    <div>
                        <label>Identification Type:</label>
                        <input type="text" name="identification_type" value={newGuest.identification_type} onChange={handleInputChange} required />
                    </div>
                    <div>
                        <label>Identification Number:</label>
                        <input type="text" name="identification_number" value={newGuest.identification_number} onChange={handleInputChange} required />
                    </div>
                    <button type="submit">Submit</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default AddGuestForm;