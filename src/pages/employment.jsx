import React from 'react';
import Link from 'gatsby-link';

export default function EmploymentPage({ data }) {
  const tasks = data.epics.edges;

  return (
    <div>
      {tasks.map((task) => {
        const taskNode = task.node;
        return (
          <div key={taskNode.jiraIssue.jiraFields.key}>
            <Link to={taskNode.slug}>{taskNode.jiraIssue.jiraFields.summary}</Link>
            <p>{taskNode.author}</p>
            <p>{taskNode.description}</p>
          </div>
        )
      })}
    </div>
  );
};

EmploymentPage.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export const query = graphql`
    query EmploymentQuery {
        epics: allJiraIssue(filter: {type: {eq: "Employment"}, project: {eq: "Finance"}}) {
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
                    }
                }
                }
            }
        }
    }
  `;