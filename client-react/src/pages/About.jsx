import './About.css';

const About = () => {
  // Cala Tarida Beach, Ibiza coordinates
  const location = {
    lat: 38.9086,
    lng: 1.4330,
    address: "Cala Tarida, 07830 Sant Josep de sa Talaia, Ibiza, Spain"
  };

  return (
    <div className="about-page">
      <div className="container">
        <h1 className="section-title">About Our Hotel</h1>
        
        <div className="about-content">
          <div className="about-image">
            <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Our Hotel in Ibiza" />
          </div>
          
          <div className="about-text">
            <h2>Our Story</h2>
            <p>Founded in 1990, our hotel has been providing exceptional service and luxurious accommodations in Ibiza for over 30 years.</p>
            
            <h2>Why Choose Us?</h2>
            <ul>
              <li>5-minute walk to Cala Tarida Beach</li>
              <li>Private sunset viewing terrace</li>
              <li>Authentic Ibizan architecture</li>
              <li>Award-winning Mediterranean cuisine</li>
            </ul>
          </div>
        </div>

        {/* Location Section */}
        <div className="location-section">
          <h2>Find Us in Ibiza</h2>
          <div className="map-container">
            <iframe
                title="Ibiza Location"
                width="100%"
                height="400"
                src="https://maps.google.com/maps?q=Cala%20Tarida,%20Ibiza&t=k&z=16&output=embed"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen
                ></iframe>
          </div>
          <div className="address">
            <i className="fas fa-map-marker-alt"></i>
            <p>{location.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;