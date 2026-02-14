import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import gmailIcon from '../../../assets/Login/gmail.png';
import phoneIcon from '../../../assets/Login/phone.png';
import styles from './LoginForm.module.css';

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
    navigate("/home");
  };

  return (
    <div className={styles.loginFormWrapper}>
      <h1 className={styles.authTitle}>Login</h1>
      <button className={styles.oauthBtn}>
        <img src={gmailIcon} alt="Google" style={{ marginRight: 8, width: 20, height: 20 }} /> Sign in with Google
      </button>
      <button className={styles.phoneBtn}>
        <img src={phoneIcon} alt="Phone" style={{ marginRight: 8, width: 20, height: 20 }} /> Sign in with Phone Number
      </button>
      <div className={styles.dividerRow}>
        <div className={styles.line} />
        <span className={styles.orText}>OR</span>
        <div className={styles.line} />
      </div>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: 16 }}>
          <label className={styles.formLabel}>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={styles.formInput}
            required
          />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label className={styles.formLabel}>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={styles.formInput}
            required
          />
        </div>
        <div style={{ textAlign: "right", marginBottom: 16 }}>
          <a href="#" className={styles.forgotLink}>Forgot Password ?</a>
        </div>
        <button type="submit" className={styles.submitBtn}>Login</button>
      </form>
      <div className={styles.mutedText}>Don't Have Account? <Link to="/register" style={{ color: '#333', fontWeight: 600, textDecoration: 'none' }}>Sign up</Link></div>
    </div>
  );
};

export default LoginForm;
