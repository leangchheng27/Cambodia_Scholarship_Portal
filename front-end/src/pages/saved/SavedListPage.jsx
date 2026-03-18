import React, { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Header from '../../layouts/Header/header.jsx';
import Footer from '../../layouts/Footer/footer.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import {
  getSavedUpdatedEventName,
  readSavedItems,
  removeSavedItem,
} from '../../utils/savedItems.js';
import './SavedListPage.css';

const typeLabel = {
  internship: 'Internship',
  'scholarship-cambodia': 'Scholarship (Cambodia)',
  'scholarship-abroad': 'Scholarship (Abroad)',
  university: 'University',
};

export default function SavedListPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const userId = user?.id || 'guest';
  const [savedItems, setSavedItems] = useState([]);

  useEffect(() => {
    setSavedItems(readSavedItems(userId));

    const handleSavedUpdate = (event) => {
      if (event?.detail?.userId && event.detail.userId !== userId) {
        return;
      }
      setSavedItems(readSavedItems(userId));
    };

    const handleStorage = (event) => {
      if (!event.key || !event.key.startsWith('csp_saved_items:')) return;
      setSavedItems(readSavedItems(userId));
    };

    window.addEventListener(getSavedUpdatedEventName(), handleSavedUpdate);
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener(getSavedUpdatedEventName(), handleSavedUpdate);
      window.removeEventListener('storage', handleStorage);
    };
  }, [userId]);

  const grouped = useMemo(() => {
    const groups = {
      internship: [],
      'scholarship-cambodia': [],
      'scholarship-abroad': [],
      university: [],
    };

    savedItems.forEach((item) => {
      if (groups[item.type]) {
        groups[item.type].push(item);
      }
    });

    return groups;
  }, [savedItems]);

  if (!user) {
    return <Navigate to="/login?redirect=%2Fsaved" replace />;
  }

  const handleRemove = (key) => {
    const nextItems = removeSavedItem(key, userId);
    setSavedItems(nextItems);
  };

  return (
    <div className="saved-page">
      <Header />
      <main className="saved-main">
        <section className="saved-shell">
          <div className="saved-header">
            <h1>Saved List</h1>
            <p>Review internships, scholarships, and universities you bookmarked.</p>
          </div>

          {savedItems.length === 0 ? (
            <div className="saved-empty">
              <h2>No saved items yet</h2>
              <p>Save opportunities from listing pages to access them quickly later.</p>
              <Link to="/home" className="saved-home-link">Go to homepage</Link>
            </div>
          ) : (
            Object.entries(grouped).map(([type, items]) => (
              items.length > 0 && (
                <section key={type} className="saved-group">
                  <h2>{typeLabel[type] || type}</h2>
                  <div className="saved-grid">
                    {items.map((item) => (
                      <article key={item.key} className="saved-card">
                        <div className="saved-media">
                          {item.image ? (
                            <img src={item.image} alt={item.title} className="saved-media-img" />
                          ) : (
                            <div className="saved-media-fallback" aria-hidden="true">
                              {(item.title || 'S').charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div className="saved-card-head">
                          <span>{typeLabel[item.type] || item.type}</span>
                        </div>
                        <h3>{item.title}</h3>
                        <p>{item.description || 'No description available.'}</p>
                        <div className="saved-actions">
                          <button
                            type="button"
                            className="saved-btn saved-btn-primary"
                            onClick={() => navigate(item.detailPath)}
                          >
                            Open Detail
                          </button>
                          <button
                            type="button"
                            className="saved-btn"
                            onClick={() => handleRemove(item.key)}
                          >
                            Remove
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )
            ))
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
