import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Img = styled.img`
    margin-right: 5px;
    margin-bottom: 0px;
`;

export default function ProgressShield({ subTasks, parentTask }) {
  const closedCount = subTasks.filter(task => task.jiraFields.status.name === 'Closed').length;
  const percentComplete = (closedCount / subTasks.length).toFixed(2) * 100;

  if (parentTask.jiraFields.status.name === 'Closed') {
    return <Img src="https://Img.shields.io/badge/Progress-100%25-brightgreen.svg" />;
  }
  if (percentComplete != null && percentComplete >= 0 && percentComplete <= 100) {
    return <Img src={`https://Img.shields.io/badge/Progress-${percentComplete}%25-brightgreen.svg`} />;
  }
  return <Img src="https://Img.shields.io/badge/Progress-0%25-brightgreen.svg" />;
}

ProgressShield.propTypes = {
  subTasks:
    PropTypes.arrayOf(PropTypes.object).isRequired, // eslint-disable-line react/forbid-prop-types
  parentTask: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
