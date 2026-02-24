import React from 'react';
import './DetailBanner.css';

const DetailBanner = ({ image, alt }) => {
  return (
    <div className="detail-banner">
      <img src={image} alt={alt} />
    </div>
  );
};

export default DetailBanner;
