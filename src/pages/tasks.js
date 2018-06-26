import React from 'react'
import Link from 'gatsby-link'

const TasksPage = (props) => {
    const tasks = props.data.epics.edges;

    return (
        <div>
            <h5>What I'm Currently Working On...</h5>
            {tasks.map((task, i) => {
                const taskNode = task.node;
                return (
                    <div key={i}>
                        <Link to={'/' + taskNode.slug}>{taskNode.jiraIssue.jiraFields.summary}</Link>
                        <p>{taskNode.author}</p>
                        <p>{taskNode.description}</p>
                    </div>
                )
            })}
        </div>
    );
};

export default TasksPage

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