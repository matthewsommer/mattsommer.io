import React from 'react';
import PropTypes from 'prop-types';

export default function TaskLabels({ labels }) {
  if (labels.length > 0) {
    return (
      <span className="mt-0 text-secondary">
        {labels.map((label, i) => (
          <span key={label}>
            {label}
            {i !== (labels.length - 1) ? ', ' : ' '}
          </span>))}
      </span>
    );
  }
  return null;
}

TaskLabels.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
};
