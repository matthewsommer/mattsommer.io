import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import StatusIcon from './status-icon/status-icon';

function getFieldName(task, field) {
  return task.jiraIssue.jiraFields[field].name;
}

function ListItem(props) {
  return (
    <div>
      <StatusIcon status={props.value.jiraIssue.jiraFields.status.name} />
      <Link to={`/${props.value.slug}`} className="text-secondary">{props.value.jiraIssue.jiraFields.summary}</Link>
    </div>
  );
}

function HeaderGroup(props) {
  const listItems = props.tasks.map((task) =>
    <ListItem key={task.slug} value={task} />
  );
  return (
    <div>
      <h3>{props.header}</h3>
      {listItems}
    </div>
  );
}

export default function TasksByField({ tasks, title, type = '', field, monoType = 'true' }) {
  const taskList = Array.from(tasks.map(t => t.node));
  const headersArray = taskList.map(t => getFieldName(t, field)).sort();
  const headersSet = new Set(headersArray);
  const headers = Array.from(headersSet);
  const fieldSection = headers.map((fieldValue) =>
    <div key={fieldValue}>
      <div className="text-dark h2">{fieldValue}</div>
      <HeaderGroup tasks={taskList.filter(t => t.jiraIssue.jiraFields[field].name === fieldValue)} />
    </div>
  );

  return (
    <div>
      <div className="h2 text-dark">{title}</div>
      {fieldSection}
    </div>
  );
  // const headersArray = tasks.map(
  //   task => task.node.jiraIssue.jiraFields[field] != null
  //     ? task.node.jiraIssue.jiraFields[field].name
  //     : null,
  // ).sort();
  // const headersSet = new Set(headersArray);
  // const headers = Array.from(headersSet);
  // return (
  //   <div>
  //     <div className="h2 text-dark">{title}</div>
  //     {headers.map((project) => {
  //       return ([
  //         <div key={project} className="text-dark h2 mb-0 mt-4">
  //           {project}
  //           {type}</div>,
  //         tasks.map((task) => {
  //           const taskNode = task.node;
  //           if (taskNode.jiraIssue.jiraFields[field] != null
  //             && taskNode.jiraIssue.jiraFields[field].name === project) {
  //             return (
  //               <div key={taskNode.id}>
  //                 <div>
  //                   <StatusIcon status={taskNode.jiraIssue.jiraFields.status.name} />
  //                   <Link to={`/${taskNode.slug}`} className="text-secondary">
  //                     {monoType === 'false' ? `${taskNode.jiraIssue.jiraFields.issuetype.name} - ` : ''}
  //                     {taskNode.jiraIssue.jiraFields.summary}
  //                   </Link>
  //                 </div>
  //               </div>
  //             );
  //           }
  //           return null;
  //         }),
  //       ]);
  //     })}
  //   </div>
  // );
}

TasksByField.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string,
  field: PropTypes.string.isRequired,
  monoType: PropTypes.string,
};
