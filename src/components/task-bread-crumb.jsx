import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

export default function TaskBreadCrumb({ projectName, typeName, epic = null }) {
  return (
    <span>
      {`${projectName} ${typeName} `}
      {epic != null ? <Link to={`/${epic.slug}`} className="text-dark">{epic.jiraIssue.jiraFields.summary}</Link> : ''}
    </span>
  );
}

TaskBreadCrumb.propTypes = {
  projectName: PropTypes.string.isRequired,
  typeName: PropTypes.string.isRequired,
  epic: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

TaskBreadCrumb.defaultProps = {
  epic: null,
};
