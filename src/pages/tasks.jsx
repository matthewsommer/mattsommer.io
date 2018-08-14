import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

export default function TasksPage({ props }) {
  const { tasks } = props.data.epics.edges;
  if (tasks && tasks.length > 0) {
    const headersSet = new Set(
      tasks.map(
        task => task.node.jiraIssue.jiraFields.project != null
          ? task.node.jiraIssue.jiraFields.project.name : null,
      ).sort(),
    );
    const headers = Array.from(headersSet);
    return (
      <div>
        <div className="text-dark h2">Currently It&#39m...</div>
        {headers.map((project) => {
          return ([
            tasks.map((task) => {
              const taskNode = task.node;
              if (taskNode.jiraIssue.jiraFields.project != null
                && taskNode.jiraIssue.jiraFields.project.name === project) {
                return (
                  <div key={taskNode.jiraIssue.jiraFields.key} className="align-top">
                    <Link to={`/${taskNode.slug}`} className="text-secondary">
                      {taskNode.jiraIssue.jiraFields.issuetype.name}
                      -
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
  return (
    <div>
      It&#39s a mystery, for now.
    </div>
  );
}

TasksPage.propTypes = {
  props: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export const query = graphql`
    query TasksQuery {
        epics: allJiraIssue(filter: {status: {eq: "In Progress"}}) {
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
