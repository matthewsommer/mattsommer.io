import React from 'react';
import PropTypes from 'prop-types';

export default function ProjectTypeEpic({ project, type, epic }) {
  let text = [project, type, epic].join(" ");
  return (
    <span>
      {text}
    </span>
  );
}

ProjectTypeEpic.propTypes = {
  project: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  epic: PropTypes.string,
};
