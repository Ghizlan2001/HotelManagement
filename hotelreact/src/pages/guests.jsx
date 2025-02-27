import axios from "axios";
import { useEffect, useState } from "react";
import AddGuestForm from "../components/guestModal"; 

const Guests = () => {
    const [guests, setGuests] = useState([]);
    const [displayedGuests, setDisplayedGuests] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getGuests();
    }, []);

    const getGuests = async () => {
        const resp = await axios.get("/guests");
        setGuests(resp.data);
        setDisplayedGuests(resp.data); 
        console.log(resp.data);
    };

    const handleAddGuestClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleCheckInClick = () => {
        const currentlyCheckedIn = guests.filter(guest => 
            guest.reservations.some(reservation => 
                new Date(reservation.check_in_date) <= new Date() && 
                new Date(reservation.check_out_date) >= new Date()
            )
        );
        setDisplayedGuests(currentlyCheckedIn);
    };

    const handleCheckOutClick = () => {
        const checkedOutGuests = guests.filter(guest => 
            guest.reservations.every(reservation => 
                new Date(reservation.check_out_date) < new Date()
            )
        );
        setDisplayedGuests(checkedOutGuests);
    };

    const handleAllClick = () => {
        setDisplayedGuests(guests); 
    };

    const handleAddGuestSubmit = async (newGuest) => {
        await axios.post("/guests", newGuest);
        getGuests(); 
    };

    return (
        <div className="container">
            <h6 className="title">Guests</h6>
            <div className="content">
                <div className="header">
                    <header>
                        <div>
                            <button className="tab" onClick={handleAllClick}>All</button>
                            <button className="tab" onClick={handleCheckInClick}>Check In</button>
                            <button className="tab" onClick={handleCheckOutClick}>Check Out</button>
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
                            <th>Total Reservations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedGuests.map((guest) => (
                            <tr key={guest.id}>
                                <td>{guest.id}</td>
                                <td>{guest.first_name}</td>
                                <td>{guest.last_name}</td>
                                <td>{guest.phone_number}</td>
                                <td>{guest.email}</td>
                                <td>{guest.address}</td>
                                <td>{guest.identification_type}</td>
                                <td>{guest.identification_number}</td>
                                <td>{guest.reservations.length}</td>
                            </tr>
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
