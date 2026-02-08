
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/Login/logo.png';
import gmailIcon from '../assets/Login/gmail.png';
import phoneIcon from '../assets/Login/phone.png';
import '../styles/register.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState({ day: "05", month: "December", year: "2005" });
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !phone || !email || !password) {
      setError("Please complete all fields to continue.");
      return;
    }
    setError("");
    // Navigate to profile setup page after successful registration
    navigate('/profile-setup');
  };

  return (
    <div className="register-container">
      <div className="card">
        <div className="left">
          <img src={logo} alt="Cambodia Scholarship Portal" className="logo-img" />
        </div>
        <div className="right">
          <h1 className="title">Sign Up</h1>
          <div>
            <button className="oauth-btn">
              <img src={gmailIcon} alt="Google" style={{ marginRight: 8, width: 20, height: 20 }} /> Sign up with Google
            </button>
            <button className="phone-btn">
              <img src={phoneIcon} alt="Phone" style={{ marginRight: 8, width: 20, height: 20 }} /> Sign up with Phone Number
            </button>
          </div>

          <div className="divider">
            <div className="line" />
            <span>OR</span>
            <div className="line" />
          </div>

          <div className="subtext">Sign up with your email address</div>

          <form onSubmit={handleRegister}>
            <div className="form-row">
              <div className="form-col">
                <label>First Name</label>
                <input className="input" type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First Name" required />
              </div>
              <div className="form-col">
                <label>Last Name</label>
                <input className="input" type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last Name" required />
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label>Phone Number</label>
              <input className="input" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone Number" required />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label>Email</label>
              <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email Address" required />
            </div>

            <div style={{ marginBottom: 8 }}>
              <label>Password</label>
              <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
              <div className="helper">Use 8 or more characters with a mix of letters, numbers & symbols</div>
            </div>

            <div style={{ margin: "18px 0 8px 0" }}>
              <label>What's your date of birth?</label>
              <div className="dob-row">
                <select className="day" value={dob.day} onChange={e => setDob({ ...dob, day: e.target.value })}>
                  {[...Array(31)].map((_, i) => (
                    <option key={i+1} value={String(i+1).padStart(2, '0')}>{String(i+1).padStart(2, '0')}</option>
                  ))}
                </select>
                <select className="month" value={dob.month} onChange={e => setDob({ ...dob, month: e.target.value })}>
                  {["January","February","March","April","May","June","July","August","September","October","November","December"].map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                <select className="year" value={dob.year} onChange={e => setDob({ ...dob, year: e.target.value })}>
                  {Array.from({length: 40}, (_, i) => 2007 - i).map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>

            {error && <div className="error">{error}</div>}

            <div className="terms">
              By creating an account, you agree to the
              <a href="#" style={{ color: '#333', fontWeight: 600, textDecoration: 'none', marginLeft: 4 }}>Terms of use </a>
              and
              <a href="#" style={{ color: '#333', fontWeight: 600, textDecoration: 'none', marginLeft: 4 }}>Privacy Policy</a>.
            </div>

            <button type="submit" className="submit-btn">Sign up</button>
          </form>

          <div className="footer-text">Already have an account? <Link to="/login" style={{ color: '#333', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link></div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
