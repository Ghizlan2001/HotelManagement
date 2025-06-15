import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Reservation.css';

const Reservation = () => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    identificationType: 'Passport',
    identificationNumber: '',
    checkInDate: '',
    checkOutDate: '',
    numberOfGuests: 1,
    roomTypeId: '',
    roomId: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/room-types')
      .then(response => {
        setRoomTypes(response.data);
      })
      .catch(error => {
        console.error('Error fetching room types:', error);
      });
  }, []);

  useEffect(() => {
    if (formData.roomTypeId && formData.checkInDate && formData.checkOutDate) {
      axios.get(`/rooms?room_type_id=${formData.roomTypeId}&status=Available`)
        .then(response => {
          // Filter rooms that are not reserved for the selected dates
          const available = response.data.filter(room => {
            // You would need to implement actual availability check here
            // This is a simplified version
            return true;
          });
          setAvailableRooms(available);
        })
        .catch(error => {
          console.error('Error fetching available rooms:', error);
        });
    }
  }, [formData.roomTypeId, formData.checkInDate, formData.checkOutDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create guest
      const guestResponse = await axios.post('/guests', {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone_number: formData.phone,
        address: formData.address,
        identification_type: formData.identificationType,
        identification_number: formData.identificationNumber
      });

      // Create reservation
      await axios.post('/reservations', {
        guest_id: guestResponse.data.id,
        room_id: formData.roomId,
        check_in_date: formData.checkInDate,
        check_out_date: formData.checkOutDate,
        number_of_guests: formData.numberOfGuests,
        reservation_status: 'Pending',
        total_amount: calculateTotal(),
        payment_status: 'Pending'
      });

      navigate('/thank-you');
    } catch (error) {
      console.error('Error creating reservation:', error);
      alert('There was an error processing your reservation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateTotal = () => {
    if (!formData.roomId || !formData.checkInDate || !formData.checkOutDate) return 0;
    
    const selectedRoom = availableRooms.find(room => room.id === parseInt(formData.roomId));
    if (!selectedRoom) return 0;
    
    const checkIn = new Date(formData.checkInDate);
    const checkOut = new Date(formData.checkOutDate);
    const nights = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
    
    return nights * selectedRoom.price_per_night;
  };

  const calculateNights = () => {
    if (!formData.checkInDate || !formData.checkOutDate) return 0;
    const checkIn = new Date(formData.checkInDate);
    const checkOut = new Date(formData.checkOutDate);
    return (checkOut - checkIn) / (1000 * 60 * 60 * 24);
  };

  return (
    <div className="reservation-page">
      <div className="container">
        <h1 className="section-title">Make a Reservation</h1>
        
        <form onSubmit={handleSubmit} className="reservation-form">
          <div className="form-section">
            <h2>Guest Information</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>First Name *</label>
                <input 
                  type="text" 
                  name="firstName" 
                  value={formData.firstName} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Last Name *</label>
                <input 
                  type="text" 
                  name="lastName" 
                  value={formData.lastName} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Email *</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Phone Number *</label>
                <input 
                  type="tel" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Address *</label>
                <textarea 
                  name="address" 
                  value={formData.address} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Identification Type *</label>
                <select 
                  name="identificationType" 
                  value={formData.identificationType} 
                  onChange={handleChange}
                  required
                >
                  <option value="Passport">Passport</option>
                  <option value="Driver License">Driver License</option>
                  <option value="National ID">National ID</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Identification Number *</label>
                <input 
                  type="text" 
                  name="identificationNumber" 
                  value={formData.identificationNumber} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Reservation Details</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Check-in Date *</label>
                <input 
                  type="date" 
                  name="checkInDate" 
                  value={formData.checkInDate} 
                  onChange={handleChange} 
                  required 
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div className="form-group">
                <label>Check-out Date *</label>
                <input 
                  type="date" 
                  name="checkOutDate" 
                  value={formData.checkOutDate} 
                  onChange={handleChange} 
                  required 
                  min={formData.checkInDate || new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div className="form-group">
                <label>Number of Guests *</label>
                <input 
                  type="number" 
                  name="numberOfGuests" 
                  value={formData.numberOfGuests} 
                  onChange={handleChange} 
                  min="1" 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Room Type *</label>
                <select 
                  name="roomTypeId" 
                  value={formData.roomTypeId} 
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a room type</option>
                  {roomTypes.map(type => (
                    <option key={type.id} value={type.id}>
                      {type.room_type_name} - ${type.base_price}/night
                    </option>
                  ))}
                </select>
              </div>
              
              {formData.roomTypeId && (
                <div className="form-group">
                  <label>Available Rooms *</label>
                  <select 
                    name="roomId" 
                    value={formData.roomId} 
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a room</option>
                    {availableRooms.map(room => (
                      <option key={room.id} value={room.id}>
                        Room {room.room_number} - ${room.price_per_night}/night
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
          
          {formData.roomId && formData.checkInDate && formData.checkOutDate && (
            <div className="price-summary">
              <h3>Price Summary</h3>
              <div className="summary-details">
                <p><span>Room:</span> {availableRooms.find(r => r.id === parseInt(formData.roomId))?.room_number}</p>
                <p><span>Nights:</span> {calculateNights()}</p>
                <p><span>Price per night:</span> ${availableRooms.find(r => r.id === parseInt(formData.roomId))?.price_per_night}</p>
                <p className="total"><span>Total:</span> ${calculateTotal().toFixed(2)}</p>
              </div>
            </div>
          )}
          
          <button 
            type="submit" 
            className="btn btn-submit" 
            disabled={isSubmitting || !formData.roomId}
          >
            {isSubmitting ? 'Processing...' : 'Complete Reservation'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reservation;