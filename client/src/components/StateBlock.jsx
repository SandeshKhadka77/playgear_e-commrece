import React from 'react';
import { Link } from 'react-router-dom';
import { FiAlertCircle, FiInfo } from 'react-icons/fi';

const StateBlock = ({ title, message, tone = 'neutral', actionLabel, actionTo }) => {
  const icon = tone === 'error' ? <FiAlertCircle /> : <FiInfo />;

  return (
    <div className={`state-block ${tone}`} role="status" aria-live="polite">
      <div className="state-icon">{icon}</div>
      <h3>{title}</h3>
      {message && <p>{message}</p>}
      {actionLabel && actionTo && (
        <Link className="state-action" to={actionTo}>{actionLabel}</Link>
      )}
    </div>
  );
};

export default StateBlock;
