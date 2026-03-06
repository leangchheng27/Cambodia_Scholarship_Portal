import React from 'react';
import './ContactInfo.css';

const ContactInfo = () => {
  return (
    <div className="contact-info-section">
      <h3>Get In Touch</h3>
      <p>Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
      
      <div className="contact-details">
        <div className="contact-item">
          <span className="contact-icon">📧</span>
          <div>
            <h4>Email</h4>
            <p>info@cambodiascholarship.edu.kh</p>
          </div>
        </div>

        <div className="contact-item">
          <span className="contact-icon">📱</span>
          <div>
            <h4>Phone</h4>
            <p>+855 XX XXX XXX</p>
          </div>
        </div>

        <div className="contact-item">
          <span className="contact-icon">📍</span>
          <div>
            <h4>Address</h4>
            <p>Phnom Penh, Cambodia</p>
          </div>
        </div>

        <div className="contact-item">
          <span className="contact-icon">⏰</span>
          <div>
            <h4>Working Hours</h4>
            <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
