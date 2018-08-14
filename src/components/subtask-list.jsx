import React from 'react';
import PropTypes from 'prop-types';
import StatusIcon from './status-icon/status-icon';

export default function SubtaskList({ value }) {
  return (
    <div>
      {value.length > 0 ? <h3 className="text-dark">Tasks</h3> : ''}
      {value.map((task) =>
        <div key={task.jiraFields.key}>
          <StatusIcon status={task.jiraFields.status.name} />
          {task.jiraFields.summary}
        </div>)}
    </div>
  );
}

SubtaskList.propTypes = {
  value: PropTypes.arrayOf(PropTypes.object).isRequired,
};
