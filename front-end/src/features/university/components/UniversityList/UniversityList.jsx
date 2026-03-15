import React, { useState, useEffect } from "react";
import './UniversityList.css';
import API from '../../../../services/api';

const UniversityList = ({ onUniversityClick, selectedProvince }) => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div className="university-list-container"><p>Loading universities...</p></div>;
  if (error) return <div className="university-list-container"><p className="error">{error}</p></div>;

  return (
  <div className="university-list-container">
    <table className="university-list-table">
      <thead>
        <tr>
          <th>SCHOOL NAME</th>
          <th>PROVINCE</th>
          <th>CITY</th>
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
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default UniversityList;