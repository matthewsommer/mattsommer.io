import React from 'react';
import PropTypes from 'prop-types';

export default function JiraIconLink({ taskKey }) {
  return <a href={`https://timetopretend.atlassian.net/browse/${taskKey}`} target="_blank" rel="noopener noreferrer" className="text-muted">⌗ </a>;
}

JiraIconLink.propTypes = {
  taskKey: PropTypes.string.isRequired,
};
