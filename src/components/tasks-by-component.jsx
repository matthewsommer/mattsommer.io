import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import StatusIcon from './status-icon/status-icon';

export default function TasksByComponent({
  field,
  title,
  monoType,
  tasks = 'true',
}) {
  if (tasks.length > 0) {
    const tasksWithComponent = tasks.filter(
      task => task.node.jiraIssue.jiraFields[field] != null
        && task.node.jiraIssue.jiraFields.components.length > 0,
    );
    const componentsSet = new Set(tasksWithComponent.map(
      task => task.node.jiraIssue.jiraFields[field],
    ));
    const componentsArray = Array.from(componentsSet);
    // const merged = [].concat.apply([], componentsArray);
    const merged = [].concat(...componentsArray);
    const headers = Array.from(new Set(merged.map(item => item.name))).sort();
    return (
      <div>
        <div className="text-dark h2">{title}</div>
        {headers.map((component) => {
          return ([
            <div key={component} className="text-dark h2 mb-0 mt-4">{component}</div>,
            tasksWithComponent.map((task) => {
              const taskNode = task.node;
              if (taskNode.jiraIssue.jiraFields[field].findIndex(
                taskItem => taskItem.name === component,
              ) !== -1) {
                return (
                  <div key={taskNode.jiraIssue.jiraFields.key}>
                    <StatusIcon status={taskNode.jiraIssue.jiraFields.status.name} />
                    <Link to={`/${taskNode.slug}`} className="text-dark">
                      {monoType === 'false' ? `${taskNode.jiraIssue.jiraFields.issuetype.name} - ` : ' '}
                      {taskNode.jiraIssue.jiraFields.summary}
                    </Link>
                  </div>
                );
              }
              return null;
            }),
          ]);
        })}
      </div>
    );
  }
  return null;
}

TasksByComponent.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  field: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  monoType: PropTypes.string.isRequired,
};
