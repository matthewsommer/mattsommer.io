import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

export default function TaskList({ data }) {
  const { tasks } = data.allJiraIssue.edges;
  return (
    <div>
      {tasks.map((task, i) => {
        const taskNode = task.node;
        return (
          <div key={i}>
            <Link to={`/${taskNode.slug}`}>{taskNode.jiraIssue.jiraFields.summary}</Link>
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
    query TaskStatusFilter($status: String!) {
    allJiraIssue(filter: {status: {eq: $status}}) {
        edges {
            node {
                slug
                jiraIssue {
                    id
                    jiraFields {
                        summary
                        project {
                            name
                        }
                        status {
                            name
                        }
                    }
                }
            }
        }
      }
    }
  `;