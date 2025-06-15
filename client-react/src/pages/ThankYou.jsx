import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ThankYou.css';

const ThankYou = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/'); // Redirect to home after 8 seconds
    }, 8000);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="thank-you-container">
      <div className="checkmark-animation">
        <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
          <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
        </svg>
      </div>
      <h1>Reservation Received!</h1>
      <p className="confirmation-message">
        Thank you for choosing Diva Hotel. We've received your reservation request 
        and will contact you within 24 hours to confirm your booking.
      </p>
      <p className="contact-info">
        For immediate assistance, please call <span>+1 234 567 890</span>
      </p>
    </div>
  );
};

export default ThankYou;