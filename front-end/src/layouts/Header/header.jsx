import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { getSavedItems } from '../../api/savedApi.js';
import './header.css';
import logo from '../../assets/Header/logo.png';
import blur from '../../assets/Header/blur.png';
import saveIcon from '../../assets/Header/save.png';
import profileIcon from '../../assets/Header/profile.png';

export default function Header()  {
    const { user, isAuthenticated } = useAuth();
    const [savedCount, setSavedCount] = useState(0);
    const dragRef = useRef(null);
    const isDraggingRef = useRef(false);
    const profileHref = isAuthenticated ? '/profile' : '/login?redirect=%2Fprofile';

    useEffect(() => {
        const loadSavedCount = async () => {
            if (!user) {
                setSavedCount(0);
                return;
            }
            try {
                const items = await getSavedItems();
                setSavedCount(items?.length || 0);
            } catch (error) {
                console.error('Error loading saved count:', error);
                setSavedCount(0);
            }
        };

        loadSavedCount();

        // Listen for updates from other components
        const handleUpdate = (event) => {
            // If count is provided in the event, use it immediately
            if (event.detail?.count !== undefined) {
                setSavedCount(event.detail.count);
            } 
            // If only action is provided (increment/decrement), update count
            else if (event.detail?.action === 'increment') {
                setSavedCount(prev => prev + 1);
            } else if (event.detail?.action === 'decrement') {
                setSavedCount(prev => Math.max(0, prev - 1));
            }
        };
        window.addEventListener('saved:updated', handleUpdate);

        return () => {
            window.removeEventListener('saved:updated', handleUpdate);
        };
    }, [user]);

    useEffect(() => {
        const el = dragRef.current;
        if (!el) return;

        const getClient = (ev) => (ev.touches ? ev.touches[0] : ev);

        const startDrag = (startEvent) => {
            // ignore if started on a link
            if (startEvent.target && startEvent.target.closest('a')) return;
            startEvent.preventDefault();
            const start = getClient(startEvent);
            const rect = el.getBoundingClientRect();
            const offsetX = start.clientX - rect.left;
            const offsetY = start.clientY - rect.top;

            el.style.position = 'fixed';
            el.style.left = `${rect.left}px`;
            el.style.top = `${rect.top}px`;
            el.style.margin = '0';
            el.classList.add('dragging');
            isDraggingRef.current = false;

            const onMove = (ev) => {
                ev.preventDefault();
                const m = getClient(ev);
                const left = m.clientX - offsetX;
                const top = m.clientY - offsetY;
                el.style.left = `${left}px`;
                el.style.top = `${top}px`;
                isDraggingRef.current = true;
            };

            const end = () => {
                window.removeEventListener('mousemove', onMove);
                window.removeEventListener('mouseup', end);
                window.removeEventListener('touchmove', onMove);
                window.removeEventListener('touchend', end);
                el.classList.remove('dragging');
                // keep final position as fixed so element stays where placed
            };

            window.addEventListener('mousemove', onMove);
            window.addEventListener('mouseup', end);
            window.addEventListener('touchmove', onMove, { passive: false });
            window.addEventListener('touchend', end);
        };

        el.addEventListener('mousedown', startDrag);
        el.addEventListener('touchstart', startDrag, { passive: false });

        return () => {
            el.removeEventListener('mousedown', startDrag);
            el.removeEventListener('touchstart', startDrag);
        };
    }, []);

    function DropdownContent() {
        const handleClick = (e) => {
            // if user was dragging, ignore this click
            if (isDraggingRef.current) {
                isDraggingRef.current = false;
                e.preventDefault();
                return;
            }
            const root = document.querySelector('.dropdown.open');
            if (root) root.classList.remove('open');
        };

        return (
            <div
                className="dropdown-content"
                ref={dragRef}
                onClick={handleClick}
            >
                <Link to="/scholarships/cambodia">Cambodia</Link>
                <Link to="/scholarships/abroad">Abroad</Link>
            </div>
        );
    }

    return (
        <header className="header">
            <img src={blur} alt="" className="header-bg" />
            
            <div className="top-bar">
                <div className="top-bar-container">
                    <div className="top-links">
                        <Link to="/home">Home</Link>
                        <Link to="/services">Services</Link>
                        <Link to="/contact">Contact</Link>
                    </div>
                    <div className="language-selector">
                        <span>🌐 ENGLISH</span>
                    </div>
                </div>
            </div>

            <div className="logo-container">
                <div className="logo-section">
                    <Link to="/home"><img src={logo} alt="Cambodia Scholarship Portal" className="header-logo" /></Link>

                    <div className="nav-actions-group">
                        <nav className="nav-menu">
                            <Link to="/about">About</Link>
                            <Link to="/services">Services</Link>
                            <div className="dropdown" tabIndex={0}>
                                {/* Clickable toggle for both mouse and keyboard */}
                                <span
                                    className="dropdown-toggle"
                                        role="button"
                                        aria-haspopup="true"
                                        aria-expanded={false}
                                >
                                    Scholarship ▾
                                </span>
                                <DropdownContent />
                            </div>
                            <Link to="/university">University</Link>
                            <Link to="/scholarships/internship">Internship</Link>
                        </nav>

                        <div className="header-actions">
                            <Link to="/saved" className="bookmark-btn" aria-label="Open saved list">
                                <img src={saveIcon} alt="Save" />
                                {savedCount > 0 && <span className="saved-count-badge">{savedCount > 99 ? '99+' : savedCount}</span>}
                            </Link>
                            <Link to={profileHref} className="profile-btn"><img src={profileIcon} alt="Profile" /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
