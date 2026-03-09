import React from "react";
import "./UniversityFilter.css";

const provinces = [
  "Phnom Penh", "Siem Reap", "Sihanoukville", "Battambang", "Kampot", "Kep", "Kandal", "Banteay Meanchey", "Kampong Cham", "Kampong Thom", "Kampong Chhnang", "Steung Treng", "Kompong Speu",
  "Pursat", "Oddar Meanchey", "Svay Rieng", "Koh Kong", "Tbong Khmum", "Preah Vihear", "Mondulkiri", "Ratanakiri", "Kratie", "Pailin", "Prey Veng", "Takeo"
];

const UniversityFilter = ({ selectedProvince, onProvinceSelect }) => {
  const mid = Math.ceil(provinces.length / 2);
  const pCol1 = provinces.slice(0, mid);
  const pCol2 = provinces.slice(mid);
  
  return (
    <div className="university-filter">
      <div className="filter-section">
        <div className="filter-header">City/Province</div>
        <div className="filter-list filter-list-2col">
          <div className="filter-col">
            {pCol1.map((province) => (
              <div
                key={province}
                className={`filter-item${selectedProvince === province ? " active" : ""}`}
                onClick={() => onProvinceSelect(province)}
              >
                {province}
              </div>
            ))}
          </div>
          <div className="filter-col">
            {pCol2.map((province) => (
              <div
                key={province}
                className={`filter-item${selectedProvince === province ? " active" : ""}`}
                onClick={() => onProvinceSelect(province)}
              >
                {province}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityFilter;
