import axios from "axios";
import { useEffect, useState } from "react";
import AddGuestForm from "../components/guestModal"; 

const Guests = () => {
    const [guests, setGuests] = useState([]);
    const [displayedGuests, setDisplayedGuests] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const guestsPerPage = 4; // Number of guests per page

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getGuests();
    }, []);

    const getGuests = async () => {
        setCurrentPage(1); // Reset to first page on new data fetch

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

    const indexOfLastGuest = currentPage * guestsPerPage;
    const indexOfFirstGuest = indexOfLastGuest - guestsPerPage;
    const currentGuests = displayedGuests.slice(indexOfFirstGuest, indexOfLastGuest);

    return (
        <div>
            <div className="container">
                <h6 className="title">Guests</h6>
                <div className="content">
                    <header>
                        <div className="header">
                            <button className="tab" onClick={handleAllClick}>All</button>
                            <button className="tab" onClick={handleCheckInClick}>Check In</button>
                            <button className="tab" onClick={handleCheckOutClick}>Check Out</button>
                        </div>
                        <button className="add" onClick={handleAddGuestClick}>Add Guest</button>        
                    </header>
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
                            {currentGuests.map((guest) => (
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
                    <div className="pagination">
                        <button className="tab" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                            Previous
                        </button>
                        <span>Page {currentPage} of {Math.ceil(displayedGuests.length / guestsPerPage)}</span>
                        <button className="tab" onClick={() => setCurrentPage(currentPage + 1)} disabled={indexOfLastGuest >= displayedGuests.length}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Guests;
