import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

export default function TaskList({ data }) {
  const tasks = data.allJiraIssue.edges;
  return (
    <div>
      {tasks.map((task) => {
        const taskNode = task.node;
        return (
          <div key={taskNode.jiraIssue.jiraFields.keys}>
            <Link to={taskNode.slug}><h4>{taskNode.jiraIssue.jiraFields.summary}</h4></Link>
            <p>{taskNode.jiraIssue.jiraFields.description}</p>
          </div>
        );
      })}
    </div>
  );
}

TaskList.propTypes = {
  data: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export const query = graphql`
    query TaskFilter($project: String!) {
        allJiraIssue(filter: {project: {eq: $project}}) {
        edges {
            node {
                slug
                jiraIssue {
                    id
                    jiraFields {
                        summary
                        description
                        project {
                            name
                        }
                        issuetype {
                          name
                        }
                    }
                }
            }
          }
      }
    }
  `;
