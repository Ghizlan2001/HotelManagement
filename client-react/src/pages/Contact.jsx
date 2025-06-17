import { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="contact-page">
      <div className="container">
        <h1 className="section-title">Contact Us</h1>

        <div className="contact-container">
          <div className="contact-info">
            <h2>Our Information</h2>
            <div className="info-item">
              <i className="fas fa-map-marker-alt"></i>
              <p>123 Luxury Avenue, City, Country</p>
            </div>
            <div className="info-item">
              <i className="fas fa-phone"></i>
              <p>+1 (123) 456-7890</p>
            </div>
            <div className="info-item">
              <i className="fas fa-envelope"></i>
              <p>info@divahotel.com</p>
            </div>
            <div className="info-item">
              <i className="fas fa-clock"></i>
              <p>24/7 Reception</p>
            </div>

            <div className="social-media">
              <h3>Follow Us</h3>
              <div className="social-icons">
                <span className="icon">
                  <i className="fab fa-facebook-f"></i>
                </span>
                <span className="icon">
                  <i className="fab fa-twitter"></i>
                </span>
                <span className="icon">
                  <i className="fab fa-instagram"></i>
                </span>
                <span className="icon">
                  <i className="fab fa-linkedin-in"></i>
                </span>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <h2>Send Us a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
