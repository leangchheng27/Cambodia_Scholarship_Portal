import React, { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Header from '../../layouts/Header/header.jsx';
import Footer from '../../layouts/Footer/footer.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import LoadingText from '../../components/ui/LoadingText/LoadingText.jsx';
import { getSavedItems, unsaveItem } from '../../api/savedApi.js';
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
  const [savedItems, setSavedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSavedItems = async () => {
      if (!user) return;
      try {
        setLoading(true);
        const items = await getSavedItems();
        setSavedItems(items || []);
      } catch (error) {
        console.error('Error loading saved items:', error);
        setSavedItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadSavedItems();
  }, [user]);

  const grouped = useMemo(() => {
    const groups = {
      internship: [],
      'scholarship-cambodia': [],
      'scholarship-abroad': [],
      university: [],
    };

    savedItems.forEach((item) => {
      const type = item.itemType; // API returns itemType
      if (groups[type]) {
        groups[type].push(item);
      }
    });

    return groups;
  }, [savedItems]);

  if (!user) {
    return <Navigate to="/login?redirect=%2Fsaved" replace />;
  }

  const handleRemove = async (itemId) => {
    // Optimistic UI update
    const newCount = savedItems.length - 1;
    setSavedItems(savedItems.filter(item => item.itemId !== itemId));
    
    // Dispatch event with count for header and other components
    window.dispatchEvent(new CustomEvent('saved:updated', { detail: { count: newCount } }));

    try {
      await unsaveItem(itemId);
    } catch (error) {
      console.error('Error removing item:', error);
      // Revert optimistic update on error
      const updatedItems = await getSavedItems();
      setSavedItems(updatedItems || []);
    }
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

          {loading ? (
            <LoadingText text="Loading saved items..." />
          ) : savedItems.length === 0 ? (
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
                      <article key={item.id} className="saved-card">
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
                          <span>{typeLabel[item.itemType] || item.itemType}</span>
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
                            onClick={() => handleRemove(item.itemId)}
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
