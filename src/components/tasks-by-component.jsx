import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import StatusIcon from './status-icon/status-icon';

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

export default function TasksByComponent({ title, tasks }) {
  const tasksWithComponent = tasks.filter(
    task => task.node.jiraIssue.jiraFields.components != null
      && task.node.jiraIssue.jiraFields.components.length > 0,
  );
  const componentsSet = new Set(tasksWithComponent.map(
    task => task.node.jiraIssue.jiraFields.components,
  ));
  const componentsArray = Array.from(componentsSet);
  const merged = [].concat(...componentsArray);
  const headers = Array.from(new Set(merged.map(item => item.name))).sort();

  const taskList = Array.from(tasksWithComponent.map(t => t.node));
  const section = headers.map(header => (
    <div key={header}>
      <HeaderGroup
        header={header}
        tasks={taskList
          .filter(t => t.jiraIssue.jiraFields.components
            .filter(c => c.name === header).length > 0)}
      />
    </div>));

  return (
    <div>
      <div className="h2 text-dark">{title}</div>
      {section}
    </div>
  );
}

TasksByComponent.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
};
