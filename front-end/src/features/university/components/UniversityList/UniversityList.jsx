import React, { useState, useEffect } from "react";
import './UniversityList.css';
import API from '../../../../services/api';
import LoadingText from '../../../../components/ui/LoadingText/LoadingText.jsx';
import { useAuth } from '../../../../context/AuthContext.jsx';
import { buildSavedItemKey, readSavedItems, toggleSavedItem } from '../../../../utils/savedItems.js';
import saveIcon from '../../../../assets/Header/save.png';

const UniversityList = ({ onUniversityClick, selectedProvince }) => {
  const { user } = useAuth();
  const userId = user?.id || 'guest';
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savedKeys, setSavedKeys] = useState(new Set());

  useEffect(() => {
    const savedSet = new Set(readSavedItems(userId).map((item) => item.key));
    setSavedKeys(savedSet);
  }, [userId]);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        setLoading(true);
        const response = await API.get('/universities');
        setUniversities(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching universities:', err);
        setError('Failed to load universities');
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  const filtered = selectedProvince
    ? universities.filter((u) => u.location === selectedProvince || u.province === selectedProvince)
    : universities;

  if (loading) return <div className="university-list-container"><LoadingText text="Loading universities..." /></div>;
  if (error) return <div className="university-list-container"><p className="error">{error}</p></div>;

  const handleToggleSave = (event, university) => {
    event.stopPropagation();

    const key = buildSavedItemKey('university', university.id);
    const payload = {
      key,
      id: university.id,
      type: 'university',
      title: university.name || 'University',
      description: `${university.location || university.province || 'N/A'} • ${university.location || 'N/A'}`,
      image: '',
      detailPath: `/universities/${university.id}`,
    };

    const result = toggleSavedItem(payload, userId);
    setSavedKeys(new Set(result.items.map((item) => item.key)));
  };

  return (
  <div className="university-list-container">
    <table className="university-list-table">
      <thead>
        <tr>
          <th>SCHOOL NAME</th>
          <th>PROVINCE</th>
          <th>CITY</th>
          <th>SAVE</th>
        </tr>
      </thead>
      <tbody>
        {filtered.map((university) => (
          <tr
            key={university.id}
            className="clickable-row"
            onClick={() => {
              if (onUniversityClick) {
                onUniversityClick(university.id);
              }
            }}
          >
            <td>{university.name}</td>
            <td>{university.location || university.province || 'N/A'}</td>
            <td>{university.location || 'N/A'}</td>
            <td>
              <button
                type="button"
                className={`university-save-btn ${savedKeys.has(buildSavedItemKey('university', university.id)) ? 'saved' : ''}`}
                onClick={(event) => handleToggleSave(event, university)}
                aria-label={savedKeys.has(buildSavedItemKey('university', university.id)) ? 'Remove university from saved list' : 'Save university'}
              >
                <img src={saveIcon} alt="" aria-hidden="true" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default UniversityList;