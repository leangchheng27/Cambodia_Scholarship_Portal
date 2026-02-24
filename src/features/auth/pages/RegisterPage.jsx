import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import SocialAuthButtons from '../components/SocialAuthButtons';
import AuthDivider from '../components/AuthDivider';
import DateOfBirthPicker from '../components/DateOfBirthPicker';
import logo from '../../../assets/Login/logo.png';
import '../styles/register.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
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
    
    // Save user data to context
    login({
      name: `${firstName} ${lastName}`,
      email: email,
      phone: phone,
      nationality: 'Cambodian',
      dob: dob,
      interests: [],
      skills: [],
    });
    
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
          
          <SocialAuthButtons mode="register" />

          <AuthDivider />

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
              <input className="input" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="012 588 8425" required />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label>Email</label>
              <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="user@gmail.com" required />
            </div>

            <div style={{ marginBottom: 8 }}>
              <label>Password</label>
              <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter a password" required />
              <div className="helper">Use 8 or more characters with a mix of letters, numbers & symbols</div>
            </div>

            <DateOfBirthPicker dob={dob} setDob={setDob} />

            {error && <div className="error">{error}</div>}

            <div className="terms">
              By creating an account, you agree to the <a href="#">Terms of use</a> and <a href="#">Privacy Policy</a>.
            </div>

            <button type="submit" className="submit-btn">Sign up</button>
          </form>

          <div className="footer-text">Already have an account? <Link to="/login">Sign in</Link></div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
