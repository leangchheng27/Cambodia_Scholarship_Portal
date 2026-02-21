import React from "react";
import './UniversityList.css';

const universities = [
  { id: 1, name: "Cambodia Academy of Digital Technology", province: "Phnom Penh", city: "Phnom Penh" },
  { id: 2, name: "Royal University of Phnom Penh", province: "Phnom Penh", city: "Phnom Penh" },
  { id: 3, name: "Institute of Technology of Cambodia", province: "Phnom Penh", city: "Phnom Penh" },
  { id: 4, name: "Royal University of Agriculture", province: "Phnom Penh", city: "Phnom Penh" },
  { id: 5, name: "Royal University of Law and Economics", province: "Phnom Penh", city: "Phnom Penh" },
  // ...add more as needed
];

const UniversityList = ({ onUniversityClick }) => (
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
        {universities.map((university) => (
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

export default UniversityList;