import React from "react";
import "./UniversityFilter.css";

const provinces = [
  "Phnom Penh", "Siem Reap", "Sihanoukville", "Battambang", "Kampot", "Kep", "Kandal", "Banteay Meanchey", "Kampong Cham", "Kampong Thom", "Kampong Chhnang", "Steung Treng", "Kompong Speu",
  "Pursat", "Oddar Meanchey", "Svay Rieng", "Koh Kong", "Tbong Khmum", "Preah Vihear", "Mondulkiri", "Ratanakiri", "Kratie", "Pailin", "Prey Veng", "Takeo"
];

const UniversityFilter = () => {
  // Split provinces into two columns
  const mid = Math.ceil(provinces.length / 2);
  const col1 = provinces.slice(0, mid);
  const col2 = provinces.slice(mid);
  return (
    <div className="university-filter">
      <div className="filter-header">Province</div>
      <div className="filter-list filter-list-2col">
        <div className="filter-col">
          {col1.map((province, idx) => (
            <div key={province} className={`filter-item${idx === 0 ? " active" : ""}`}>{province}</div>
          ))}
        </div>
        <div className="filter-col">
          {col2.map((province, idx) => (
            <div key={province} className="filter-item">{province}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UniversityFilter;
