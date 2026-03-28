import React from 'react';
import Header from '../../layouts/Header/header.jsx';
import Footer from '../../layouts/Footer/footer.jsx';
import ContactForm from '../../features/contact/components/ContactForm/ContactForm.jsx';
import ContactInfo from '../../features/contact/components/ContactInfo/ContactInfo.jsx';
import './ContactPage.css';

const ContactPage = () => {
  return (
    <div className="contact-page">
      <Header />
      
      <div className="contact-wrapper">
        {/* Header Section */}
        <div className="contact-header-content">
          <h1 className="contact-main-title">Contact our team</h1>
          <p className="contact-header-desc">
            Got any questions about our platform or how to get started? We're here to help.<br />
            Chat to our friendly team 24/7 and get onboard in less than 5 minutes.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="contact-container">
          {/* Left Side - Form */}
          <div className="contact-form-section">
            <ContactForm />
          </div>

          {/* Right Side - Contact Info */}
          <ContactInfo />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;
