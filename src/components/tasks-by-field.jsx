import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import StatusIcon from './status-icon/status-icon';

export default function TasksByField({
  tasks, title, type = '', field, monoType = 'true' }) {
  const headers = Array.from(new Set(tasks.map(task => task.node.jiraIssue.jiraFields[field] != null ? task.node.jiraIssue.jiraFields[field]["name"] : null).sort()));
  return (
    <div>
      <div className="h2 text-dark">{title}</div>
      {headers.map((project) => {
        return ([
          <div key={project} className="text-dark h2 mb-0 mt-4">{project} {type}</div>,
          tasks.map((task) => {
            const taskNode = task.node;
            if (taskNode.jiraIssue.jiraFields[field] != null && taskNode.jiraIssue.jiraFields[field].name === project) {
              return (
                <div key={taskNode.jiraFields.key}>
                  <div className=''><StatusIcon status={taskNode.jiraIssue.jiraFields.status.name} />
                    <Link to={'/' + taskNode.slug} className="text-secondary">
                      {monoType === 'false' ? taskNode.jiraIssue.jiraFields.issuetype.name + ' - ' : ''}
                      {taskNode.jiraIssue.jiraFields.summary}
                    </Link>
                  </div>
                </div>
              );
            }
          }),
        ]);
      })}
    </div>
  );
}

TasksByField.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  monoType: PropTypes.string.isRequired,
};
