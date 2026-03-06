// TabNavigation.jsx
import React from "react";

const TabNavigation = ({ tabs, activeTab, onTabClick }) => (
  <div className="tab-navigation">
    {tabs.map(tab => (
      <button
        key={tab}
        className={`tab${activeTab === tab ? " active" : ""}`}
        onClick={() => onTabClick(tab)}
        type="button"
      >
        {tab}
      </button>
    ))}
  </div>
);

export default TabNavigation;