import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { buildSavedItemKey, isSavedItem, toggleSavedItem } from '../../utils/savedItems.js';
import saveIcon from '../../assets/Header/save.png';
import './ScholarshipCard.css';

const ScholarshipCard = ({ 
  scholarship, 
  showMatchScore = false, 
  basePath = '/scholarships/cambodia' 
}) => {
  const { user } = useAuth();
  const userId = user?.id || 'guest';
  const navigate = useNavigate();

  const itemType = useMemo(() => {
    if (basePath.includes('/internship')) return 'internship';
    if (basePath.includes('/abroad')) return 'scholarship-abroad';
    return 'scholarship-cambodia';
  }, [basePath]);

  const itemKey = useMemo(
    () => buildSavedItemKey(itemType, scholarship.id),
    [itemType, scholarship.id]
  );

  const [saved, setSaved] = useState(() => isSavedItem(itemKey, userId));

  useEffect(() => {
    setSaved(isSavedItem(itemKey, userId));
  }, [itemKey, userId]);

  const handleCardClick = () => {
    navigate(`${basePath}/detail/${scholarship.id}`);
  };

  const getMatchColor = (score) => {
    if (!score) return '#6b7280';
    if (score >= 85) return '#10b981';
    if (score >= 70) return '#3b82f6';
    if (score >= 55) return '#f59e0b';
    return '#6b7280';
  };

  const handleSaveClick = (event) => {
    event.stopPropagation();
    event.preventDefault();

    const payload = {
      key: itemKey,
      id: scholarship.id,
      type: itemType,
      title: scholarship.title || scholarship.name || 'Untitled',
      description: scholarship.description || '',
      image: scholarship.image || '',
      detailPath: `${basePath}/detail/${scholarship.id}`,
    };

    const result = toggleSavedItem(payload, userId);
    setSaved(result.saved);
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
            style={{ backgroundColor: getMatchColor(scholarship.matchScore) }}
          >
            {scholarship.matchScore}%
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

export default ScholarshipCard;
