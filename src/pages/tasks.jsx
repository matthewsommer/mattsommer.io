import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

export default function TasksPage({ data }) {
  const { edges: tasks } = data.tasks;
  const taskList = Array.from(tasks.map(t => t.node));

  const section = taskList.map(task => (
    <div key={task.slug}>
      {`${task.jiraIssue.jiraFields.project.name} > ${task.jiraIssue.jiraFields.issuetype.name}: `}
      <Link to={`/${task.slug}`} className="text-secondary">{task.jiraIssue.jiraFields.summary}</Link>
    </div>));

  return (
    <div>
      <div className="h2 text-dark">Currently I’m...</div>
      {section}
    </div>
  );
}

TasksPage.propTypes = {
  data: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export const query = graphql`
    query TasksQuery {
      tasks: allJiraIssue(filter: {status: {eq: "In Progress"}}) {
            edges {
                node {
                    slug
                    jiraIssue {
                        id
                        jiraFields {
                            summary
                            status {
                                name
                            }
                            project {
                                name
                            }
                            issuetype {
                                name
                            }
                            components {
                                name
                            }
                        }
                    }
                }
            }
        }
    }
  `;
