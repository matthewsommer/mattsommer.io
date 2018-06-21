import React from 'react'
import Link from 'gatsby-link'

const EducationPage = (props) => {
    const tasks = props.data.epics.edges;

    return (
        <div>
            {tasks.map((task, i) => {
                const taskNode = task.node;
                return (
                    <div key={i}>
                        <Link to={taskNode.slug}>{taskNode.jiraIssue.jiraFields.summary}</Link>
                        <p>{taskNode.author}</p>
                        <p>{taskNode.description}</p>
                    </div>
                )
            })}
        </div>
    );
};

export default EducationPage

export const query = graphql`
    query EducationQuery {
        epics: allJiraIssue(filter: {type: {eq: "Epic"}, project: {eq: "Education"}}) {
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