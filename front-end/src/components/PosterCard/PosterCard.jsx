import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { saveItem, unsaveItem, getSavedItems } from '../../api/savedApi.js'; // ✅
import saveIcon from '../../assets/Header/save.png';
import { recordFeedback } from '../../api/feedbackApi.js';
import './PosterCard.css';

const PosterCard = ({ 
  scholarship, 
  showMatchScore = false, 
  basePath = '/scholarships/cambodia' 
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const itemType = useMemo(() => {
    if (basePath.includes('/internship')) return 'internship';
    if (basePath.includes('/abroad')) return 'scholarship-abroad';
    return 'scholarship-cambodia';
  }, [basePath]);

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const checkSaved = async () => {
      if (!user) return;
      try {
        const items = await getSavedItems();
        const isSaved = items.some(item => item.itemId === String(scholarship.id));
        setSaved(isSaved);
      } catch (err) {
        console.error('Failed to check saved status:', err);
      }
    };
    checkSaved();
  }, [user, scholarship.id]);

  const handleCardClick = () => {
    recordFeedback({
      scholarshipId: scholarship.id,
      scholarshipType: itemType,
      action: 'click',
      scholarshipSnapshot: { title: scholarship.title || scholarship.name, description: scholarship.description },
    });
    navigate(`${basePath}/detail/${scholarship.id}`);
  };

  const getMatchColor = (score) => {
    // Green background for all star ratings
    return '#10b981';
  };

  const renderStars = (score) => {
    if (!score) return '★';
    
    // Handle case where score might still be 0-100, convert to 1-5
    let normalizedScore = score;
    if (score > 5) {
      normalizedScore = Math.max(1, (score / 100) * 5);
    }
    
    // Round to nearest whole number for full stars only
    const fullStars = Math.min(5, Math.max(1, Math.round(normalizedScore)));
    
    // Display only filled stars (★★★ not ★★★☆☆)
    return '★'.repeat(fullStars);
  };

  const handleSaveClick = async (event) => {
    event.stopPropagation();
    event.preventDefault();

    if (!user) {
      navigate('/login');
      return;
    }

    // Optimistic UI update
    const newSavedState = !saved;
    setSaved(newSavedState);
    
    // Dispatch event with info for header and other components
    // We'll send 'increment' or 'decrement' since we don't know total count here
    window.dispatchEvent(new CustomEvent('saved:updated', { detail: { action: newSavedState ? 'increment' : 'decrement' } }));

    try {
      if (saved) {
        await unsaveItem(String(scholarship.id));
        recordFeedback({
          scholarshipId: scholarship.id,
          scholarshipType: itemType,
          action: 'dismiss',
          scholarshipSnapshot: { title: scholarship.title || scholarship.name, description: scholarship.description },
        });
      } else {
        await saveItem({
          itemId: String(scholarship.id),
          itemType,
          title: scholarship.title || scholarship.name || 'Untitled',
          description: scholarship.description || '',
          image: scholarship.image || '',
          detailPath: `${basePath}/detail/${scholarship.id}`,
        });
        recordFeedback({
          scholarshipId: scholarship.id,
          scholarshipType: itemType,
          action: 'save',
          scholarshipSnapshot: { title: scholarship.title || scholarship.name, description: scholarship.description },
        });
      }
    } catch (err) {
      console.error('Failed to toggle save:', err);
      // Revert optimistic update on error
      setSaved(!newSavedState);
    }
  };

  return (
    <div className="scholarship-card" onClick={handleCardClick}>
      <div className="card-image-wrapper">
        <img 
          src={scholarship.image} 
          alt={scholarship.title} 
          className="card-image" 
        />
        {showMatchScore && scholarship.matchScore && (
          <div 
            className="match-badge-overlay"
            style={{ 
              backgroundColor: getMatchColor(scholarship.matchScore),
              color: '#FFC107'
            }}
          >
            {renderStars(scholarship.matchScore)}
          </div>
        )}
        <button
          type="button"
          className={`card-save-btn ${saved ? 'saved' : ''}`}
          onClick={handleSaveClick}
          aria-label={saved ? 'Remove from saved list' : 'Save this item'}
        >
          <img src={saveIcon} alt="" aria-hidden="true" />
        </button>
      </div>
      <div className="card-content">
        <h3 className="card-title">{scholarship.title}</h3>
        <p className="card-description">{scholarship.description}</p>
        <button className="view-detail-btn">
          View more detail
        </button>
      </div>
    </div>
  );
};

export default PosterCard;