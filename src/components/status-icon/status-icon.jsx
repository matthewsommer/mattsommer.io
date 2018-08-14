import React from 'react';
import PropTypes from 'prop-types';

function importAll(r) {
  return r.keys().map(r);
}

const icons = importAll(require.context('/', false, /\.(png|jpe?g|svg)$/));

export default function StatusIcon({ status }) {
  if (status === 'Open') {
    return <span className="h3 mr-1"><img src={icons[1]} style={{ width: '0.6em' }} alt="open icon" /></span>;
  }
  if (status === 'Closed') {
    return <span className="h3 text-success mr-1"><img src={icons[0]} style={{ width: '0.6em' }} alt="closed icon" /></span>;
  }
  return <span className="h3">☐</span>;
}

StatusIcon.propTypes = {
  status: PropTypes.string.isRequired,
};
