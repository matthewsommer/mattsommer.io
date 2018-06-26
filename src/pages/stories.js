import React from 'react'
import Link from 'gatsby-link'

const StoriesPage = (props) => {
    const tasks = props.data.epics.edges;

    return (
        <div>
            <h1>Stories</h1>
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

export default StoriesPage

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