import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const AddGuestForm = () => {
    const [newGuest, setNewGuest] = useState({
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        address: '',
        identification_type: '',
        identification_number: ''
    });
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();

    useEffect(() => {
            if (id && location.state?.guest) {
                const guest = location.state.guest;
                setNewGuest(guest);
            }
    }, [id, location.state]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewGuest({ ...newGuest, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!newGuest.first_name || !newGuest.last_name || !newGuest.phone_number || !newGuest.email || !newGuest.address || !newGuest.identification_type || !newGuest.identification_number) {
            alert('Please fill in all fields');
            return;
        }
        try {
            const guestData = newGuest;

            if (id) {
                await axios.put(`/guests/${id}`, guestData);
            } else {
                await axios.post("/guests", newGuest);
                alert("Guest added successfully");
            }
            setNewGuest({
                first_name: '',
                last_name: '',
                phone_number: '',
                email: '',
                address: '',
                identification_type: '',
                identification_number: ''
            });
            navigate('/guests');
        } catch (error) {
            console.error('Error adding guest:', error);
        }
    };

    return (
        <div className="add-guest-container">
            <h1>Add Guest</h1>
            <form className="add-guest-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name:</label>
                    <input type="text" name="first_name" value={newGuest.first_name} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Last Name:</label>
                    <input type="text" name="last_name" value={newGuest.last_name} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Phone Number:</label>
                    <input type="text" name="phone_number" value={newGuest.phone_number} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={newGuest.email} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Address:</label>
                    <input type="text" name="address" value={newGuest.address} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Identification Type:</label>
                    <input type="text" name="identification_type" value={newGuest.identification_type} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Identification Number:</label>
                    <input type="text" name="identification_number" value={newGuest.identification_number} onChange={handleInputChange} required />
                </div>
                <button type="submit" className="submit-button">Add Guest</button>
                <button type="button" className="cancel-button" onClick={() => navigate('/guests')}>Cancel</button>
            </form>
        </div>
    );
};

export default AddGuestForm;
