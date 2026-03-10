import React, { useState } from 'react';
import './TabbedSection.css';

const TabbedSection = ({ tabs, content, showSectionHeader }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <>
      {showSectionHeader && (
        <div className="tab-section-header">
          <h2>{activeTab}</h2>
        </div>
      )}
      <div className="tabbed-section-container">
        <div className="tab-navigation">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`tab${activeTab === tab ? " active" : ""}`}
            onClick={() => setActiveTab(tab)}
            type="button"
          >
            {tab}
          </button>
        ))}
      </div>
        <div className="tab-content">
          {content[activeTab]}
        </div>
      </div>
    </>
  );
};

export default TabbedSection;