import React, { useState } from 'react';
import Header from '../../layouts/Header/header.jsx';
import Footer from '../../layouts/Footer/footer.jsx';
import './ContactPage.css';
import contactBanner from '../../assets/contact/banner.png';
import contactIllustration from '../../assets/contact/contact.png';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    nameOrEmail: '',
    phoneNumber: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
    alert('Thank you for contacting us! We will get back to you soon.');
    // Reset form
    setFormData({
      nameOrEmail: '',
      phoneNumber: '',
      message: ''
    });
  };

  return (
    <div className="contact-page">
      <Header />
      
      {/* Hero Banner */}
      <div className="contact-hero-banner">
        <img src={contactBanner} alt="Contact Banner" className="contact-banner-image" />
      </div>

      {/* Contact Header Section */}
      <section className="contact-header-section">
        <div className="contact-header-container">
          <h1 className="contact-main-title">Contact US</h1>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <div className="contact-form-container">
          {/* Left Side - Illustration */}
          <div className="contact-illustration">
            <img src={contactIllustration} alt="Customer Support" className="illustration-image" />
          </div>

          {/* Right Side - Form */}
          <div className="contact-form-wrapper">
            <div className="contact-form-box">
              <h2 className="contact-form-title">Contact US</h2>
              
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <input
                    type="text"
                    name="nameOrEmail"
                    value={formData.nameOrEmail}
                    onChange={handleChange}
                    placeholder="Enter Name or Email"
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    className="form-textarea"
                    rows="6"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
