import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import RoomTypeCard from '../components/RoomTypeCard';
import ServiceCard from '../components/ServiceCard';
import './Home.css';

const Home = () => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [services] = useState([
    {
      id: 1,
      name: "Spa & Wellness",
      description: "Relax with our premium spa treatments and wellness services designed to rejuvenate your body and mind.",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 2,
      name: "Gourmet Restaurant",
      description: "Experience exquisite dining with our award-winning chefs and carefully curated menus featuring local and international cuisine.",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 3,
      name: "Rooftop Pool",
      description: "Enjoy breathtaking city views while relaxing at our infinity pool with premium cocktail service.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
  ]);

  useEffect(() => {
    // Fetch room types
    axios.get('/room-types')
      .then(response => {
        setRoomTypes(response.data);
      })
      .catch(error => {
        console.error('Error fetching room types:', error);
      });
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Welcome to Diva Hotel</h1>
              <p className="lead">Experience luxury redefined at Diva Hotel, where elegance meets comfort in the heart of the city.</p>
              <p>Our meticulously designed rooms and suites, combined with impeccable service, create an unforgettable stay for our discerning guests.</p>
              <Link to="/reservation" className="btn">Book Your Stay</Link>
            </div>
            <div className="hero-image">
              <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" alt="Diva Hotel" />
            </div>
          </div>
        </div>
      </section>

      {/* Room Types Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Our Rooms</h2>
          <div className="grid grid-3">
            {roomTypes.map(roomType => (
              <RoomTypeCard key={roomType.id} roomType={roomType} />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section bg-light">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <div className="grid grid-3">
            {services.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;