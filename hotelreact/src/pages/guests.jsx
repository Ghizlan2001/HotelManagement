import axios from "axios";
import { useEffect, useState } from "react";
import AddGuestForm from "../components/guestModal"; 

const Guests = () => {
    const [guests, setGuests] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getGuests();
    }, []);

    const getGuests = async () => {
        const resp = await axios.get("/guests");
        setGuests(resp.data);
        console.log(resp.data);
    };

    const handleAddGuestClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleAddGuestSubmit = async (newGuest) => {
        await axios.post("/guests", newGuest);
        getGuests(); // Refresh the guests list after adding a new guest
    };

    return (
        <div className="container">
            <h6 className="title">Guests</h6>
            <div className="content">
                <div className="header">
                    <header>
                        <div>
                            <a href="" className="tab">Check In</a>
                            <a href="" className="tab">Check Out</a>
                        </div>
                        <div>
                            <button onClick={handleAddGuestClick}>Add Guest</button>
                        </div>
                    </header>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Guest Id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Identification Type</th>
                            <th>Identification Number</th>
                            <th>Check In Date</th>
                            <th>Check Out Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {guests.map((guest) => (
                            guest.reservations.map((reservation) => (
                                <tr key={`${guest.id}`}>
                                    <td>{guest.id}</td>
                                    <td>{guest.first_name}</td>
                                    <td>{guest.last_name}</td>
                                    <td>{guest.phone_number}</td>
                                    <td>{guest.email}</td>
                                    <td>{guest.address}</td>
                                    <td>{guest.identification_type}</td>
                                    <td>{guest.identification_number}</td>
                                    <td>{reservation.check_in_date}</td>
                                    <td>{reservation.check_out_date}</td>
                                </tr>
                            ))
                        ))}
                    </tbody>
                </table>
            </div>
            {isModalOpen && (
                <AddGuestForm onClose={handleCloseModal} onSubmit={handleAddGuestSubmit} />
            )}
        </div>
    );
};

export default Guests;