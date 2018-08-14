import React from 'react';
import PropTypes from 'prop-types';
import StatusIcon from './status-icon/status-icon';

export default function SubtaskList({ value }) {
  return (
    <div>
      <h3 className="text-dark"></h3>
      {value.map((task) => {
        return ([
          <div key={task.jiraFields.key}>
            <StatusIcon status={task.jiraFields.status.name} />
            {task.jiraFields.summary}
          </div>,
        ]);
      })}
    </div>
  );
}

SubtaskList.propTypes = {
  value: PropTypes.arrayOf(PropTypes.object).isRequired,
};
