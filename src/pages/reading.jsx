import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

export default function ReadingPage({ data }) {
  const tasks = data.reading.edges;
  const statuses = [{ name: 'In Progress', label: 'Currently Reading' }, { name: 'Closed', label: 'Have Read' }, { name: 'Open', label: 'Want to Read' }];
  return (
    <div>
      <div className="text-dark h2">Reading List</div>
      {statuses.map((status) => {
        return ([
          <div className="text-dark h2 mb-0 mt-4">{status.label}</div>,
          tasks.map((taskNode) => {
            const task = taskNode.node.jiraIssue;
            const slug = taskNode.node.slug;
            if (task.jiraFields.status != null && task.jiraFields.status.name === status.name) {
              return (
                <div className="pt-2">
                  <Link to={'/' + slug} className="text-secondary">
                    <h4>
                      {task.jiraFields.summary}
                    </h4>
                  </Link>
                  By {task.jiraFields.customfield_10100}
                </div>
              );
            }
          }),
        ]);
      })}
    </div>
  );
};

ReadingPage.propTypes = {
  data: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export const query = graphql`
    query ReadingQuery {
        reading: allJiraIssue(filter: {type: {eq: "Reading"}, project: {eq: "Education"}}) {
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
                    customfield_10100
                    priority {
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
