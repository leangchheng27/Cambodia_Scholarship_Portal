import React from "react";
import './UniversityList.css';
import { universities } from '../../../../data/universities';

const UniversityList = ({ onUniversityClick, selectedProvince }) => {
  const filtered = selectedProvince
    ? universities.filter((u) => u.province === selectedProvince)
    : universities;

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
            <td>{university.province}</td>
            <td>{university.city}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default UniversityList;