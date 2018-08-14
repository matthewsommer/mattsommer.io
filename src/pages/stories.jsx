import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

export default function StoriesPage({ data }) {
  const tasks = data.epics.edges;
  return (
    <div>
      <h1>Stories</h1>
      {tasks.map((task) => {
        const taskNode = task.node;
        return (
          <div key={taskNode.jiraIssue.jiraFields.key}>
            <Link to={taskNode.slug}>{taskNode.jiraIssue.jiraFields.summary}</Link>
            <p>{taskNode.author}</p>
            <p>{taskNode.description}</p>
          </div>
        );
      })}
    </div>
  );
}

StoriesPage.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export const query = graphql`
    query StoriesQuery {
        epics: allJiraIssue(filter: {type: {eq: "Story"}}) {
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
