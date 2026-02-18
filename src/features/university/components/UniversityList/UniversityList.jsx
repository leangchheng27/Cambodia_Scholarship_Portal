import React from "react";
import "./UniversityList.css";

const universities = [
  { name: "Cambodia Academy Digital of Technology", province: "Phnom Penh", city: "Phnom Penh" },
  { name: "Royal University of Phnom Penh", province: "Phnom Penh", city: "Phnom Penh" },
  { name: "Institute of Technology of Cambodia", province: "Phnom Penh", city: "Phnom Penh" },
  { name: "Royal University of Agriculture", province: "Phnom Penh", city: "Phnom Penh" },
  { name: "Royal University of Law and Economics", province: "Phnom Penh", city: "Phnom Penh" },
  { name: "Royal University of Fine Arts", province: "Phnom Penh", city: "Phnom Penh" },
  { name: "Pannasastra University of Cambodia (PUC)", province: "Phnom Penh", city: "Phnom Penh" },
  { name: "The University of Cambodia (UC)", province: "Phnom Penh", city: "Phnom Penh" },
  { name: "American University of Phnom Penh (AUPP)", province: "Phnom Penh", city: "Phnom Penh" },
  { name: "Norton University", province: "Phnom Penh", city: "Phnom Penh" },
  { name: "BELTEI International University", province: "Phnom Penh", city: "Phnom Penh" },
  { name: "University of Puthisastra", province: "Phnom Penh", city: "Phnom Penh" },
  { name: "University of Health Science", province: "Phnom Penh", city: "Phnom Penh" }
];

const UniversityList = () => (
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
        {universities.map((u, idx) => (
          <tr key={idx}>
            <td>{u.name}</td>
            <td>{u.province}</td>
            <td>{u.city}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default UniversityList;
