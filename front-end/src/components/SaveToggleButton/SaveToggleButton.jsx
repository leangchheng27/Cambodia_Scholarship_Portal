import React from 'react';
import saveIcon from '../../assets/Header/save.png';
import './SaveToggleButton.css';

const SaveToggleButton = ({
  isSaved,
  onClick,
  variant = 'card',
  ariaLabelSaved = 'Remove from saved list',
  ariaLabelUnsaved = 'Save item',
  className = '',
}) => {
  return (
    <button
      type="button"
      className={`save-toggle-btn save-toggle-btn--${variant} ${isSaved ? 'saved' : ''} ${className}`.trim()}
      onClick={onClick}
      aria-label={isSaved ? ariaLabelSaved : ariaLabelUnsaved}
    >
      <img src={saveIcon} alt="" aria-hidden="true" />
    </button>
  );
};

export default SaveToggleButton;
