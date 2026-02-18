import { Link } from 'react-router-dom';
import './header.css';
import logo from '../../assets/Header/logo.png';
import blur from '../../assets/Header/blur.png';
import saveIcon from '../../assets/Header/save.png';
import profileIcon from '../../assets/Header/profile.png';

export default function Header()  {

    return (
        <header className="header">
            <img src={blur} alt="" className="header-bg" />
            
            <div className="top-bar">
                <div className="top-bar-container">
                    <div className="top-links">
                        <Link to="/home">Home</Link>
                        <Link to="/contact">Contact</Link>
                        <Link to="/support">Support</Link>
                    </div>
                    <div className="language-selector">
                        <span>🌐 KHMER</span>
                    </div>
                </div>
            </div>

            <div className="logo-container">
                <div className="logo-section">
                    <img src={logo} alt="Cambodia Scholarship Portal" className="header-logo" />

                    <div className="nav-actions-group">
                        <nav className="nav-menu">
                            <Link to="/about">About</Link>
                            <Link to="/scholarships" className="has-dropdown">Scholarship ▾</Link>
                            <Link to="/university">University</Link>
                            <Link to="/internship">Internship</Link>
                        </nav>

                        <div className="header-actions">
                            <button className="bookmark-btn"><img src={saveIcon} alt="Save" /></button>
                            <button className="profile-btn"><img src={profileIcon} alt="Profile" /></button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
