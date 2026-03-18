import './LoadingText.css';

const LoadingText = ({ text = 'Loading...' }) => {
  return (
    <div className="app-loading-text" role="status" aria-live="polite">
      <span className="app-loading-dot" aria-hidden="true"></span>
      <span>{text}</span>
    </div>
  );
};

export default LoadingText;
