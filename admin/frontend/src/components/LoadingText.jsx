import { useState, useEffect } from 'react';
import './LoadingText.css';

const LoadingText = ({ text = 'Loading...' }) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-text">
      <p>{text}{dots}</p>
    </div>
  );
};

export default LoadingText;
