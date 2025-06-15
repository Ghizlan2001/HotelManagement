// src/components/ServiceCard.jsx
import React from 'react';
import './ServiceCard.css'; // We'll create this next

const ServiceCard = ({ service }) => {
  return (
    <div className="service-card">
      <div className="service-image">
        <img src={service.image} alt={service.name} />
      </div>
      <div className="service-details">
        <h3>{service.name}</h3>
        <p>{service.description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;