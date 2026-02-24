import React from 'react';
import './BenefitsContent.css';

const BenefitsContent = ({ benefits }) => {
  return (
    <div className="tab-content">
      {benefits.map((benefit, index) => (
        <div key={index} className="benefit-item">
          {typeof benefit === 'string' ? (
            <div className="info-item">
              <span className="icon">⭕</span>
              <p>{benefit}</p>
            </div>
          ) : (
            <div className="info-item">
              <span className="icon">⭕</span>
              <div>
                <p><strong>{benefit.title}</strong></p>
                <ol>
                  {benefit.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ol>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BenefitsContent;
