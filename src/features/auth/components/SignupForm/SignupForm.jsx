import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignupForm.css';

const SignupForm = ({ onRegister }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState({ day: "01", month: "January", year: "2000" });
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !phone || !email || !password) {
      setError("Please complete all fields to continue.");
      return;
    }
    setError("");
    if (onRegister) onRegister({ firstName, lastName, phone, email, password, dob });
  };

  return (
    <div className="signup-form-scrollable">
      <h1 className="auth-title">Sign Up</h1>
      <button className="social-btn"><span className="icon">🌐</span> Sign up with Google</button>
      <button className="social-btn secondary">Sign up with Phone Number</button>
      <div className="divider-row">
        <div className="line" />
        <span className="or-text">OR</span>
        <div className="line" />
      </div>
      <div className="muted-text">Sign up with your email address</div>
      <form onSubmit={handleRegister} className="auth-form">
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">First Name</label>
            <input className="form-input" type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First name" required />
          </div>
          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input className="form-input" type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last name" required />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Phone Number</label>
          <input className="form-input" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone number" required />
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" required />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input className="form-input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
          <div className="muted-text">Use 8 or more characters with a mix of letters, numbers & symbols</div>
        </div>
        <div className="form-group">
          <label className="form-label">What's your date of birth?</label>
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
        {error && <div className="form-error">{error}</div>}
        <div className="muted-text">
          By creating an account, you agree to the <a href="#">Terms of use</a> and <a href="#">Privacy Policy</a>.
        </div>
        <button type="submit" className="submit-btn">Sign up</button>
      </form>
      <div className="footer-text">Already have an account? <Link to="/login">Sign in</Link></div>
    </div>
  );
};

export default SignupForm;