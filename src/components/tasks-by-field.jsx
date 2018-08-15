import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import StatusIcon from './status-icon/status-icon';

function getFieldName(task, field) {
  return task.jiraIssue.jiraFields[field].name;
}

function ListItem(props) {
  const { task } = props;
  return (
    <div>
      <StatusIcon status={task.jiraIssue.jiraFields.status.name} />
      <Link to={`/${task.slug}`} className="text-secondary">{task.jiraIssue.jiraFields.summary}</Link>
    </div>
  );
}

ListItem.propTypes = {
  task: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

function HeaderGroup(props) {
  const { header } = props;
  const { tasks } = props;
  const listItems = tasks.map(t => <ListItem key={t.slug} task={t} />);
  return (
    <div>
      <div className="text-dark h2">{header}</div>
      {listItems}
    </div>
  );
}

HeaderGroup.propTypes = {
  header: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default function TasksByField({ tasks, title, field }) {
  const taskList = Array.from(tasks.map(t => t.node));
  const headersArray = taskList.map(t => getFieldName(t, field)).sort();
  const headersSet = new Set(headersArray);
  const headers = Array.from(headersSet);
  const section = headers.map(header => (
    <div key={header}>
      <HeaderGroup
        header={header}
        tasks={taskList.filter(t => t.jiraIssue.jiraFields[field].name === header)}
      />
    </div>));

  return (
    <div>
      <div className="h2 text-dark">{title}</div>
      {section}
    </div>
  );
}

TasksByField.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
};
